let AWSController = function () { };

//packages
const uuid = require("uuid");
const fs = require("fs");
const os = require("os");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("node-ffprobe");
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;
const formidable = require("formidable");
const moment = require("moment");
const S3 = require('aws-sdk/clients/s3.js');
const QRCode = require('qrcode');

//helpers
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const CommonController = require("./CommonController");
const ResponseController = require("./ResponseController");
const config = require("../config/config");

//models
const Images = require("../models/Images");
const Audios = require("../models/Audios");
const Documents = require("../models/Documents");
const Gif_Images = require("../models/Gif_Images");
const Icons = require("../models/Icons");
const Videos = require("../models/Videos");

ffprobe.FFPROBE_PATH = ffprobeInstaller.path;

if (os.platform() === 'win32') {
    let path = process.cwd() + "/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe";
    ffmpeg.setFfmpegPath(path);
} else {
    ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");
};

let AWS_S3 = new S3({
    credentials: {
        accessKeyId: config.AWS.S3AccessKey,
        secretAccessKey: config.AWS.S3Secret,
    },
    region: config.AWS.S3Region
});

AWSController.Upload_Video_Without_Conversion = (req, res) => {
    console.log("entering video----->", new Date());
    let generateFilename = (type) => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date + '_' + type);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true, maxFileSize: config.Video_Size });
    console.log(newForm);
    let Video_Original_URL;
    let Video_Original_Path;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        console.log("Getting files----->")
        console.log(files)
        values = JSON.parse(JSON.stringify(fields));
        Video_Original_URL = generateFilename("Original");
        tmpFile = files.video.filepath;
        filename = files.video.originalFilename;
        filesplit = filename.split('.');
        contentType = files.video.mimetype;
        contentSize = files.video.size;
    });
    newForm.once('end', async () => {
        if (
            values.Whether_Thumbnail_Image_Available != null && isBoolean(values.Whether_Thumbnail_Image_Available)
        ) {
            let ValidationResult = await AWSController.Upload_Video_Validate_Thumbnail_Image(values);
            if (ValidationResult[0]) {
                let Whether_Thumbnail_Image_Available = Boolify(values.Whether_Thumbnail_Image_Available);
                if (contentSize <= config.Video_Size) {
                    if (filesplit.length > 1) {
                        extension = filesplit[(filesplit.length) - 1];
                        let videoIndex = await config.Supported_Video_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                        if (videoIndex >= 0) {
                            let contentType = "video/mp4";
                            let VideoID = uuid.v4();
                            Video_Original_URL = `${Video_Original_URL}.mp4`;
                            Video_Original_Path = `${os.tmpdir()}/${Video_Original_URL}`;
                            fs.rename(tmpFile, Video_Original_Path, async () => {
                                let fileInfo = await ffprobe(Video_Original_Path);
                                let videoInfo = await fileInfo.streams.find(ele => ele.codec_type === "video");
                                if (videoInfo === null || videoInfo === undefined) {
                                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_FILE } });
                                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                                } else {
                                    let videoDuration = parseFloat(videoInfo.duration) || 30;
                                    let videoWidth = parseInt(videoInfo.width);
                                    let videoHeight = parseInt(videoInfo.height);
                                    if (videoDuration <= config.MAXIMUM_VIDEO_SECONDS) {
                                        if (videoHeight >= config.MINIMUM_VIDEO_RESOLUTION && videoWidth >= config.MINIMUM_VIDEO_RESOLUTION) {
                                            let StoreData = {
                                                VideoID: VideoID,
                                                Video_Name: filename,
                                                Video_Original_URL: Video_Original_URL,
                                                videoDuration: videoDuration,
                                                videoWidth: videoWidth,
                                                videoHeight: videoHeight,
                                                contentType: contentType,
                                                contentSize: contentSize,
                                                Whether_Thumbnail_Image_Available: Whether_Thumbnail_Image_Available,
                                                created_at: new Date(),
                                                updated_at: new Date()
                                            };
                                            if (Whether_Thumbnail_Image_Available) {
                                                StoreData.Thumbnail_Image_Information = await CommonController.Check_for_Image(values);
                                            };
                                            let SaveResult = await Videos.create(StoreData);
                                            let Result = {
                                                success: true,
                                                extras: {
                                                    Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                                                    VideoID: VideoID,
                                                    contentType: contentType,
                                                    contentSize: contentSize,
                                                    Video_Original_URL: config.AWS.S3URL + Video_Original_URL
                                                }
                                            }
                                            await ResponseController.Common_Response_Handler(res, Result);
                                            let UploadStatus = await AWSController.Upload_FILE_AWS(Video_Original_Path, Video_Original_URL, contentType);
                                            console.log("Video func completed------->", new Date())
                                        } else {
                                            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.VIDEO_MUST_BE_ATLEAST_240_RESOLUTION } });
                                            let RemoveStatus = await AWSController.Remove_Local_File(Video_Original_Path);
                                        }
                                    } else {
                                        await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_LENGTH } });
                                        let RemoveStatus = await AWSController.Remove_Local_File(Video_Original_Path);
                                    };
                                }
                            })
                        } else {
                            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_TYPE } });
                            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                        }
                    } else {
                        await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                        let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                    }
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, ValidationResult[1]);
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
};

AWSController.Upload_Video = (req, res) => {
    let generateFilename = (type) => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date + '_' + type);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true });
    let nfile_Original;
    let Video_Original_URL;
    let Actual_URL;
    let Video_Original_Path;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        values = JSON.parse(JSON.stringify(fields));
        Actual_URL = generateFilename("");
        Video_Original_URL = generateFilename("Original");
        tmpFile = files.video.filepath;
        filename = files.video.originalFilename;
        filesplit = filename.split('.');
        contentType = files.video.mimetype;
        contentSize = files.video.size;
    });
    newForm.once('end', async () => {
        if (
            values.Whether_Thumbnail_Image_Available != null && isBoolean(values.Whether_Thumbnail_Image_Available)
        ) {
            let ValidationResult = await AWSController.Upload_Video_Validate_Thumbnail_Image(values);
            if (ValidationResult[0]) {
                let Whether_Thumbnail_Image_Available = Boolify(values.Whether_Thumbnail_Image_Available);
                if (contentSize <= config.Video_Size) {
                    if (filesplit.length > 1) {
                        extension = filesplit[(filesplit.length) - 1];
                        let videoIndex = await config.Supported_Video_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                        if (videoIndex >= 0) {
                            let contentType = "video/mp4";
                            // let contentType = "video/webm";
                            let VideoID = uuid.v4();
                            Video_Original_URL = `${Video_Original_URL}.mp4`;
                            // Video_Original_URL = `${Video_Original_URL}.webm`;
                            Video_Original_Path = `${os.tmpdir()}/${Video_Original_URL}`;
                            Actual_URL = `${Actual_URL}.${extension}`;
                            nfile_Original = `${os.tmpdir()}/${Actual_URL}`;
                            fs.rename(tmpFile, nfile_Original, async () => {
                                let outOptions = [
                                    '-preset veryfast',
                                    '-movflags +faststart',
                                    '-keyint_min 48',
                                    '-sc_threshold 0',
                                    '-g 48',
                                    '-crf 20',
                                    '-tag:v hvc1',
                                    // '-profile:v main',
                                    // '-c:v libvpx-vp9',
                                ];
                                let fileInfo = await ffprobe(nfile_Original);
                                let videoInfo = await fileInfo.streams.find(ele => ele.codec_type === "video");
                                if (videoInfo === null || videoInfo === undefined) {
                                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_FILE } });
                                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                                } else {
                                    let videoDuration = parseFloat(videoInfo.duration) || 30;
                                    let videoWidth = parseInt(videoInfo.width);
                                    let videoHeight = parseInt(videoInfo.height);
                                    if (videoDuration <= config.MAXIMUM_VIDEO_SECONDS) {
                                        if (videoHeight >= config.MINIMUM_VIDEO_RESOLUTION && videoWidth >= config.MINIMUM_VIDEO_RESOLUTION) {
                                            let All_Available_Resolutions = await AWSController.Fetch_All_Video_Available_Resolution(videoHeight);
                                            let StoreData = {
                                                VideoID: VideoID,
                                                Video_Name: filename,
                                                Video_Original_URL: Video_Original_URL,
                                                videoDuration: videoDuration,
                                                videoWidth: videoWidth,
                                                videoHeight: videoHeight,
                                                contentType: contentType,
                                                contentSize: contentSize,
                                                Whether_Thumbnail_Image_Available: Whether_Thumbnail_Image_Available,
                                                created_at: new Date(),
                                                updated_at: new Date()
                                            };
                                            if (Whether_Thumbnail_Image_Available) {
                                                StoreData.Thumbnail_Image_Information = await CommonController.Check_for_Image(values);
                                            };
                                            let SaveResult = await Videos.create(StoreData);
                                            let Result = {
                                                success: true,
                                                extras: {
                                                    Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                                                    VideoID: VideoID,
                                                    contentType: contentType,
                                                    contentSize: contentSize,
                                                    Video_Original_URL: config.AWS.S3URL + Video_Original_URL
                                                }
                                            }
                                            await ResponseController.Common_Response_Handler(res, Result);
                                            let video_command = await ffmpeg({ source: nfile_Original });
                                            video_command = await video_command.applyAutopadding(true).keepPixelAspect(true);
                                            let All_Video_Resolutions = [];
                                            for (const Current_Resoution of All_Available_Resolutions) {
                                                let URL = `${generateFilename(Current_Resoution)}.mp4`;
                                                // let URL = `${generateFilename(Current_Resoution)}.webm`;
                                                let path = `${os.tmpdir()}/${URL}`;
                                                let contentType = "video/mp4";
                                                // let contentType = "video/webm";
                                                let resolution = `?x${Current_Resoution}`;
                                                video_command = await video_command.output(path).format('mp4').videoCodec('libx265').size(resolution).audioCodec('aac').audioChannels(2).outputOptions(outOptions);
                                                // video_command = await video_command.output(path).format('webm').videoCodec('libvpx-vp9').size(resolution).audioCodec('libopus').audioChannels(2).outputOptions(outOptions);
                                                All_Video_Resolutions.push({
                                                    Resolution: Current_Resoution,
                                                    URL: URL,
                                                    path: path,
                                                    contentType: contentType
                                                });
                                            }
                                            video_command = await video_command.output(Video_Original_Path).format('mp4').videoCodec('libx265').audioCodec('aac').audioChannels(2).outputOptions(outOptions);
                                            // video_command = await video_command.output(Video_Original_Path).format('webm').videoCodec('libvpx-vp9').audioCodec('libopus').audioChannels(2).outputOptions(outOptions);
                                            await video_command.on('start', function (commandLine) {
                                            });
                                            await video_command.on('progress', function (info) {
                                            });
                                            await video_command.on('end', async () => {
                                                for (const item of All_Video_Resolutions) {
                                                    let this_fileInfo = await ffprobe(item.path);
                                                    let this_videoInfo = await this_fileInfo.streams.find(ele => ele.codec_type === "video");
                                                    item.videoDuration = parseFloat(this_videoInfo.duration) || 30;
                                                    videoDuration = item.videoDuration;
                                                    item.videoWidth = parseInt(this_videoInfo.width);
                                                    item.videoHeight = parseInt(this_videoInfo.height);
                                                    let UploadStatus = await AWSController.Upload_FILE_AWS(item.path, item.URL, item.contentType);
                                                }
                                                let UploadStatus = await AWSController.Upload_FILE_AWS(Video_Original_Path, Video_Original_URL, contentType);
                                                let RemoveStatus = await AWSController.Remove_Local_File(nfile_Original);
                                                let query = {
                                                    VideoID: VideoID,
                                                };
                                                let changes = {
                                                    $set: {
                                                        videoDuration: videoDuration,
                                                        Whether_All_Resoulution_Converted: true,
                                                        Whether_Video_Processed: true,
                                                        All_Video_Resolutions: All_Video_Resolutions,
                                                        updated_at: new Date()
                                                    }
                                                };
                                                let UpdatedStatus = await Videos.updateOne(query, changes).lean();
                                                console.log("Completed Video Conversion and AWS Upload")
                                            });
                                            await video_command.on('error', function (err) {
                                            });
                                            await video_command.run();
                                        } else {
                                            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.VIDEO_MUST_BE_ATLEAST_240_RESOLUTION } });
                                            let RemoveStatus = await AWSController.Remove_Local_File(nfile_Original);
                                        }
                                    } else {
                                        await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_LENGTH } });
                                        let RemoveStatus = await AWSController.Remove_Local_File(nfile_Original);
                                    };
                                }
                            })
                        } else {
                            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_VIDEO_TYPE } });
                            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                        }
                    } else {
                        await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                        let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                    }
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, ValidationResult[1]);
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
};


AWSController.Send_Recent_Images = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        let Data = await Images.find({ Status: true }).sort({ created_at: -1 }).select('-_id -__v -created_at -updated_at -Status').limit(20).lean();
        for (let ImageData of Data) {
            ImageData = await CommonController.Fetch_Image_Complete_Information(ImageData);
        }
        await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: Data } });
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_Icon_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.IconID != null
        ) {
            let IconData = await CommonController.Check_for_Icon(values);
            IconData = await CommonController.Fetch_Icon_Complete_Information(IconData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: IconData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_Image_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ImageID != null
        ) {
            let ImageData = await CommonController.Check_for_Image(values);
            ImageData = await CommonController.Fetch_Image_Complete_Information(ImageData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: ImageData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_Document_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.DocumentID != null
        ) {
            let DocumentData = await CommonController.Check_for_Document(values);
            DocumentData = await CommonController.Fetch_Document_Complete_Information(DocumentData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: DocumentData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_Video_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.VideoID != null
        ) {
            let VideoData = await CommonController.Check_for_Video(values);
            VideoData = await CommonController.Fetch_Video_Complete_Information(VideoData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: VideoData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_Audio_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AudioID != null
        ) {
            let AudioData = await CommonController.Check_for_Audio(values);
            AudioData = await CommonController.Fetch_Audio_Complete_Information(AudioData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: AudioData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Fetch_GIF_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.Gif_ImageID != null
        ) {
            let GifImageData = await CommonController.Check_for_GIF(values);
            GifImageData = await CommonController.Fetch_GIF_Complete_Information(GifImageData);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: GifImageData } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AWSController.Remove_Icon = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.IconID != null
        ) {
            let IconData = await CommonController.Check_for_Icon(values);
            let RemoveFile = await AWSController.REMOVE_AWS_File(IconData.Icon20);
            RemoveFile = await AWSController.REMOVE_AWS_File(IconData.Icon40);
            RemoveFile = await AWSController.REMOVE_AWS_File(IconData.Icon60);
            RemoveFile = await AWSController.REMOVE_AWS_File(IconData.Icon80);
            RemoveFile = await AWSController.REMOVE_AWS_File(IconData.Icon100);
            RemoveFile = await AWSController.REMOVE_AWS_File(IconData.IconOriginal);
            let RemoveStatus = await Icons.deleteOne({ IconID: values.IconID }).lean();
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Remove_Image = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ImageID != null
        ) {
            let ImageData = await CommonController.Check_for_Image(values);
            let RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.Image50);
            RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.Image100);
            RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.Image250);
            RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.Image550);
            RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.Image900);
            RemoveFile = await AWSController.REMOVE_AWS_File(ImageData.ImageOriginal);
            let RemoveStatus = await Images.deleteOne({ ImageID: values.ImageID }).lean();
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Remove_Document = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.DocumentID != null
        ) {
            let DocumentData = await CommonController.Check_for_Document(values);
            let RemoveFile = await AWSController.REMOVE_AWS_File(DocumentData.Document_URL);
            let RemoveStatus = await Documents.deleteOne({ DocumentID: values.DocumentID }).lean();
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Remove_Video = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.VideoID != null
        ) {
            let VideoData = await CommonController.Check_for_Video(values);
            let RemoveStatus = await Videos.deleteOne({ VideoID: values.VideoID }).lean();
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
            let RemoveFile = await AWSController.REMOVE_AWS_File(VideoData.Video_Original_URL);
            for (const item of VideoData.All_Video_Resolutions) {
                let RemoveFile = await AWSController.REMOVE_AWS_File(item.URL);
            }
            if (VideoData.Whether_Thumbnail_Image_Available) {
                let reqBody = {
                    body: VideoData.Thumbnail_Image_Information
                };
                let resJson = {
                    json: function () { }
                };
                let RemoveImage = await AWSController.Remove_Image(reqBody, res);
            }
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Remove_Audio = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AudioID != null
        ) {
            let AudioData = await CommonController.Check_for_Audio(values);
            let RemoveStatus = await Audios.deleteOne({ AudioID: values.AudioID }).lean();
            let RemoveFile = await AWSController.REMOVE_AWS_File(AudioData.Audio_URL);
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Remove_GIF = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.Gif_ImageID != null
        ) {
            let GifImageData = await CommonController.Check_for_GIF(values);
            let RemoveFile = await AWSController.REMOVE_AWS_File(GifImageData.Gif_Image_URL);
            let RemoveStatus = await Gif_Images.deleteOne({ Gif_ImageID: values.Gif_ImageID }).lean();
            await ResponseController.Common_Response_Handler(res, { success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } else {
            throw { success: false, extras: { type: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Supported_Audio_Files = async (req, res) => {
    try {
        let Data = await config.Supported_Audio_Content_Type;
        await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: Data } });
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Upload_GIF = (req, res) => {
    let generateFilename = () => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true });
    let nfile_Original;
    let Gif_Image_URL;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        values = JSON.parse(JSON.stringify(fields));
        Gif_Image_URL = generateFilename();
        tmpFile = files.gif.filepath;
        filename = files.gif.originalFilename;
        filesplit = filename.split('.');
        contentType = files.gif.mimetype;
        contentSize = files.gif.size;
    });
    newForm.once('end', async () => {
        if (contentSize <= config.GIF_Size) {
            if (filesplit.length > 1) {
                extension = filesplit[(filesplit.length) - 1];
                let gifIndex = await config.Supported_GIF_Image_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                if (gifIndex >= 0) {
                    let Gif_ImageID = uuid.v4();
                    Gif_Image_URL = `${Gif_Image_URL}.${extension}`;
                    nfile_Original = `${os.tmpdir()}/${Gif_Image_URL}`;
                    let Data = {
                        Gif_ImageID: Gif_ImageID,
                        Gif_Image_URL: Gif_Image_URL,
                        contentType: contentType,
                        contentSize: contentSize,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    Gif_Images(Data).save();
                    let Result = {
                        success: true,
                        extras: {
                            Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                            Gif_ImageID: Gif_ImageID,
                            contentType: contentType,
                            contentSize: contentSize,
                            Gif_Image_URL: config.AWS.S3URL + Gif_Image_URL
                        }
                    };
                    await ResponseController.Common_Response_Handler(res, Result);
                    fs.rename(tmpFile, nfile_Original, async () => {
                        let UploadStatus = await AWSController.Upload_FILE_AWS(nfile_Original, Gif_Image_URL, contentType);

                    });
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_GIF } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
}

AWSController.Upload_Audio = (req, res) => {
    let generateFilename = () => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true });
    let nfile_Original;
    let Audio_URL;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        values = JSON.parse(JSON.stringify(fields));
        Audio_URL = generateFilename();
        tmpFile = files.audio.filepath;
        filename = files.audio.originalFilename;
        filesplit = filename.split('.');
        contentType = files.audio.mimetype;
        contentSize = files.audio.size;
    });
    newForm.once('end', async () => {
        if (contentSize <= config.Audio_Size) {
            if (filesplit.length > 1) {
                extension = filesplit[(filesplit.length) - 1];
                let audioIndex = await config.Supported_Audio_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                if (audioIndex >= 0) {
                    let contentType = await config.Supported_Audio_Content_Type[audioIndex].type;
                    let AudioID = uuid.v4();
                    Audio_URL = `${Audio_URL}.${extension}`;
                    nfile_Original = `${os.tmpdir()}/${Audio_URL}`;
                    let Data = {
                        AudioID: AudioID,
                        Audio_URL: Audio_URL,
                        contentType: contentType,
                        contentSize: contentSize,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    Audios(Data).save();
                    let Result = {
                        success: true,
                        extras: {
                            Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                            AudioID: AudioID,
                            contentType: contentType,
                            contentSize: contentSize,
                            Audio_URL: config.AWS.S3URL + Audio_URL
                        }
                    }
                    await ResponseController.Common_Response_Handler(res, Result);
                    fs.rename(tmpFile, nfile_Original, async () => {
                        let UploadStatus = await AWSController.Upload_FILE_AWS(nfile_Original, Audio_URL, contentType);

                    })
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_AUDIO_TYPE } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
}


AWSController.Fetch_All_Video_Available_Resolution = (videoHeight) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (videoHeight < 360) {
                resolve([360]);
            } else if (videoHeight >= 360 && videoHeight < 720) {
                resolve([360]);
            } else if (videoHeight >= 720 && videoHeight < 1080) {
                resolve([360, 720]);
            } else if (videoHeight >= 1080) {
                resolve([360, 720, 1080]);
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AWSController.Upload_Video_Validate_Thumbnail_Image = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Boolify(values.Whether_Thumbnail_Image_Available)) {
                if (values.ImageID != null && values.ImageID != undefined && values.ImageID != "" && values.ImageID != " ") {
                    let ImageData = await CommonController.Check_for_Image(values);
                    resolve([true, "Validated Successfully"]);
                } else {
                    resolve([false, { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } }]);
                }
            } else {
                resolve([true, "Validated Successfully"]);
            }
        } catch (error) {
            resolve([false, error]);
        }
    });
}



AWSController.Supported_Video_Files = async (req, res) => {
    try {
        let Data = await config.Supported_Video_Content_Type;
        await ResponseController.Common_Response_Handler(res, { success: true, extras: { Data: Data } });
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AWSController.Upload_Document = (req, res) => {
    let generateFilename = () => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true });
    let nfile_Original;
    let Document_URL;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        values = JSON.parse(JSON.stringify(fields));
        Document_URL = generateFilename();
        tmpFile = files.file.filepath;
        filename = files.file.originalFilename;
        filesplit = filename.split('.');
        contentType = files.file.mimetype;
        contentSize = files.file.size;
    });
    newForm.once('end', async () => {
        if (contentSize <= config.Document_Size) {
            if (filesplit.length > 1) {
                extension = filesplit[(filesplit.length) - 1];
                let DocumentID = uuid.v4();
                Document_URL = `${Document_URL}.${extension}`;
                nfile_Original = `${os.tmpdir()}/${Document_URL}`;
                let Data = {
                    DocumentID: DocumentID,
                    Document_URL: Document_URL,
                    contentType: contentType,
                    contentSize: contentSize,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                Documents(Data).save();
                let Result = {
                    success: true,
                    extras: {
                        Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                        DocumentID: DocumentID,
                        contentType: contentType,
                        contentSize: contentSize,
                        Document_URL: config.AWS.S3URL + Document_URL
                    }
                };
                await ResponseController.Common_Response_Handler(res, Result);
                fs.rename(tmpFile, nfile_Original, async () => {
                    let UploadStatus = await AWSController.Upload_FILE_AWS(nfile_Original, Document_URL, contentType);

                })
            } else {
                await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
}

AWSController.Upload_Image = (req, res) => {
    let generateFilenameImage = (type) => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date + '_' + type);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable();
    let nfile_50, nfile_100, nfile_250, nfile_550, nfile_900, nfile_Original;
    let Image50, Image100, Image250, Image550, Image900, ImageOriginal;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        console.log(files.image)
        values = JSON.parse(JSON.stringify(fields));
        console.log(files)
        Image50 = generateFilenameImage('050');
        Image100 = generateFilenameImage('100');
        Image250 = generateFilenameImage('250');
        Image550 = generateFilenameImage('550');
        Image900 = generateFilenameImage('900');
        ImageOriginal = generateFilenameImage('Original');
        tmpFile = files.image.filepath;
        filename = files.image.originalFilename;
        filesplit = filename.split('.');
        contentType = files.image.mimetype;
        contentSize = files.image.size;
    });
    newForm.once('end', async () => {
        if (contentSize <= config.Image_Size) {
            if (filesplit.length > 1) {
                extension = filesplit[(filesplit.length) - 1];
                let imageIndex = await config.Supported_Image_Icon_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                if (imageIndex >= 0) {
                    let ImageID = uuid.v4();

                    Image50 = `${Image50}.${extension}`;
                    Image100 = `${Image100}.${extension}`;
                    Image250 = `${Image250}.${extension}`;
                    Image550 = `${Image550}.${extension}`;
                    Image900 = `${Image900}.${extension}`;
                    ImageOriginal = `${ImageOriginal}.${extension}`;

                    nfile_50 = `${os.tmpdir()}/${Image50}`;
                    nfile_100 = `${os.tmpdir()}/${Image100}`;
                    nfile_250 = `${os.tmpdir()}/${Image250}`;
                    nfile_550 = `${os.tmpdir()}/${Image550}`;
                    nfile_900 = `${os.tmpdir()}/${Image900}`;
                    nfile_Original = `${os.tmpdir()}/${ImageOriginal}`;


                    let Data = {
                        ImageID: ImageID,
                        Image50: Image50,
                        Image100: Image100,
                        Image250: Image250,
                        Image550: Image550,
                        Image900: Image900,
                        ImageOriginal: ImageOriginal,
                        contentType: contentType,
                        contentSize: contentSize,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    Images(Data).save();
                    let Result = {
                        success: true,
                        extras: {
                            Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                            ImageID: ImageID,
                            contentType: contentType,
                            contentSize: contentSize,
                            Image50: config.AWS.S3URL + Image50,
                            Image100: config.AWS.S3URL + Image100,
                            Image250: config.AWS.S3URL + Image250,
                            Image550: config.AWS.S3URL + Image550,
                            Image900: config.AWS.S3URL + Image900,
                            ImageOriginal: config.AWS.S3URL + ImageOriginal
                        }
                    };
                    await ResponseController.Common_Response_Handler(res, Result);
                    fs.rename(tmpFile, nfile_Original, async () => {
                        let ResizeData = [
                            {
                                width: 50,
                                fname: Image50,
                                nfile: nfile_50
                            },
                            {
                                width: 100,
                                fname: Image100,
                                nfile: nfile_100
                            }, {
                                width: 250,
                                fname: Image250,
                                nfile: nfile_250
                            }, {
                                width: 550,
                                fname: Image550,
                                nfile: nfile_550
                            }, {
                                width: 900,
                                fname: Image900,
                                nfile: nfile_900
                            }
                        ];
                        for (const item of ResizeData) {
                            let saveConvertedFile = await sharp(nfile_Original).resize({ fit: sharp.fit.contain, width: item.width }).png({ quality: 100 }).toFile(item.nfile);
                            let UploadStatus = await AWSController.Upload_FILE_AWS(item.nfile, item.fname, contentType);
                        }
                        let UploadStatus = await AWSController.Upload_FILE_AWS(nfile_Original, ImageOriginal, contentType);
                    })
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE_TYPE } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
}


AWSController.Upload_Icon = (req, res) => {
    let generateFilename = (type) => {
        let date = new Date().getTime();
        let charBank = "abcdefghijklmnopqrstuvwxyz";
        let fstring = '';
        for (let i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * charBank.length)];
        }
        return (fstring += date + '_' + type);
    }
    let values, tmpFile;
    let filename, filesplit, extension, contentType;
    let newForm = formidable({ keepExtensions: true });
    let nfile_20, nfile_40, nfile_60, nfile_80, nfile_100, nfile_Original;
    let Icon20, Icon40, Icon60, Icon80, Icon100, IconOriginal;
    let contentSize;
    newForm.parse(req, async (err, fields, files) => {
        values = JSON.parse(JSON.stringify(fields));
        Icon20 = generateFilename('020');
        Icon40 = generateFilename('040');
        Icon60 = generateFilename('060');
        Icon80 = generateFilename('080');
        Icon100 = generateFilename('100');
        IconOriginal = generateFilename('Original');
        tmpFile = files.icon.filepath;
        filename = files.icon.originalFilename;
        filesplit = filename.split('.');
        contentType = files.icon.mimetype;
        contentSize = files.icon.size;
    });
    newForm.once('end', async () => {
        if (contentSize <= config.Icon_Size) {
            if (filesplit.length > 1) {
                extension = filesplit[(filesplit.length) - 1];
                let iconIndex = await config.Supported_Image_Icon_Content_Type.findIndex(ele => (ele.name === extension || ele.type === contentType));
                if (iconIndex >= 0) {
                    let IconID = uuid.v4();
                    Icon20 = `${Icon20}.${extension}`;
                    Icon40 = `${Icon40}.${extension}`;
                    Icon60 = `${Icon60}.${extension}`;
                    Icon80 = `${Icon80}.${extension}`;
                    Icon100 = `${Icon100}.${extension}`;
                    IconOriginal = `${IconOriginal}.${extension}`;
                    nfile_20 = `${os.tmpdir()}/${Icon20}`;
                    nfile_40 = `${os.tmpdir()}/${Icon40}`;
                    nfile_60 = `${os.tmpdir()}/${Icon60}`;
                    nfile_80 = `${os.tmpdir()}/${Icon80}`;
                    nfile_100 = `${os.tmpdir()}/${Icon100}`;
                    nfile_Original = `${os.tmpdir()}/${IconOriginal}`;
                    let Data = {
                        IconID: IconID,
                        Icon20: Icon20,
                        Icon40: Icon40,
                        Icon60: Icon60,
                        Icon80: Icon80,
                        Icon100: Icon100,
                        IconOriginal: IconOriginal,
                        contentType: contentType,
                        contentSize: contentSize,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    Icons(Data).save();
                    let Result = {
                        success: true,
                        extras: {
                            Status: CommonMessages.UPLOADED_SUCCESSFULLY,
                            IconID: IconID,
                            contentType: contentType,
                            contentSize: contentSize,
                            Icon20: config.AWS.S3URL + Icon20,
                            Icon40: config.AWS.S3URL + Icon40,
                            Icon60: config.AWS.S3URL + Icon60,
                            Icon80: config.AWS.S3URL + Icon80,
                            Icon100: config.AWS.S3URL + Icon100,
                            IconOriginal: config.AWS.S3URL + IconOriginal
                        }
                    }
                    await ResponseController.Common_Response_Handler(res, Result);
                    fs.rename(tmpFile, nfile_Original, async () => {
                        let ResizeData = [
                            {
                                width: 20,
                                fname: Icon20,
                                nfile: nfile_20
                            },
                            {
                                width: 40,
                                fname: Icon40,
                                nfile: nfile_40
                            }, {
                                width: 60,
                                fname: Icon60,
                                nfile: nfile_60
                            }, {
                                width: 80,
                                fname: Icon80,
                                nfile: nfile_80
                            }, {
                                width: 100,
                                fname: Icon100,
                                nfile: nfile_100
                            }
                        ];
                        for (const item of ResizeData) {
                            let saveConvertedFile = await sharp(nfile_Original).resize({ fit: sharp.fit.contain, width: item.width }).png({ quality: 100 }).toFile(item.nfile);
                            let UploadStatus = await AWSController.Upload_FILE_AWS(item.nfile, item.fname, contentType);
                        }
                        let UploadStatus = await AWSController.Upload_FILE_AWS(nfile_Original, IconOriginal, contentType);

                    })
                } else {
                    await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE_TYPE } });
                    let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
                }
            } else {
                await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.INVALID_FILE } });
                let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
            }
        } else {
            await ResponseController.Common_Response_Handler(res, { success: false, extras: { code: 2, msg: ApiMessages.REQUEST_SIZE_EXCEEDED } });
            let RemoveStatus = await AWSController.Remove_Local_File(tmpFile);
        }
    })
}


/***************
 * 
 * 
 * Common Methods
 * 
 */

AWSController.QRCode_File_From_UUID = (UUID, fname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contentType = "image/png";
            let path = `${os.tmpdir()}/fname`;
            let QROptions = {
                color: {
                    dark: '#000000',
                },
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 1,
                margin: 1,
                width: 160
            }
            let QRFile = await QRCode.toFile(path, UUID, QROptions);
            let Result = await AWSController.Upload_FILE_AWS(path, fname, contentType);
            resolve(Result);
        } catch (error) {
            console.error(error);
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AWSController.Upload_FILE_AWS = (nfile, fname, contentType) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (fs.existsSync(nfile)) {
                let buf = await fs.readFileSync(nfile);
                let params = {
                    Body: buf,
                    Bucket: config.AWS.S3Bucket,
                    Key: fname,
                    ContentType: contentType,
                    ContentLength: buf.length
                };
                AWS_S3.putObject(params, async (err, data) => {
                    if (err) {
                        console.error(err, err.stack);
                        fs.unlinkSync(nfile);
                        reject("AWS Upload Fails");
                    } else {
                        fs.unlinkSync(nfile);
                        resolve({ success: true, extras: { Status: CommonMessages.UPLOADED_SUCCESSFULLY } });
                    }
                });
            } else {
                resolve({ success: true, extras: { Status: CommonMessages.UPLOADED_SUCCESSFULLY } });
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}



AWSController.REMOVE_AWS_File = fname => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Bucket: config.AWS.S3Bucket,
                Key: fname
            };
            AWS_S3.deleteObject(params, function (err, data) {
                if (err) {
                    console.error(err, err.stack);
                    reject("AWS Delete Fails");
                } else {
                    resolve("Deleted Successfully");
                }
            });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

AWSController.Remove_Local_File = (nfile) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.unlinkSync(nfile);
            resolve({ success: true, extras: { Status: CommonMessages.REMOVED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


module.exports = AWSController;