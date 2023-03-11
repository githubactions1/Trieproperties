let CommonController = function () { };

//Dependencies
const uuid = require("uuid");
const moment = require("moment");
const axios = require("axios");
const mongoose = require("mongoose");
const validator = require("validator");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;

//models or Common files
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const config = require("../config/config");
const ResponseController = require("./ResponseController");

//models
const Admins = require("../models/Admins");
const Images = require("../models/Images");
const Audios = require("../models/Audios");
const Counters = require("../models/Counters");
const Documents = require("../models/Documents");
const Gif_Images = require("../models/Gif_Images");
const Icons = require("../models/Icons");
const Videos = require("../models/Videos");
const Devices = require("../models/Devices");
const App_Versions_Settings = require("../models/App_Versions_Settings");
const Blogs = require("../models/Blogs");
const Projects = require("../models/Projects");
const Contact_Us_Info = require("../models/Contact_Us_Info");
const Why_Work_Withus = require("../models/Why_Work_Withus");
const Achievements_and_Rewards = require("../models/Achievements_and_Rewards");
const Home_Projects = require("../models/Home_Projects");
const Client_Testimonials = require("../models/Client_Testimonials");

CommonController.Generate_Random_Number_Between_Numbers = async (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

CommonController.Common_Rounded_Value = (Num) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Num2 = parseInt(Num) + 0.5;
            if (Num === Num2) {
                resolve(Num2);
            } else {
                Num = await CommonController.Common_Floating_Beautify_Value(Num);
                let number = parseInt(Math.round(Num));
                resolve(number);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};
CommonController.Common_Unique_String = async (digits) => {
    let alphabank = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
    let charBank = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ9876543210";
    charBank = charBank.toUpperCase();
    let fstring = alphabank[parseInt(Math.random() * alphabank.length)];
    for (let i = 1; i < digits; i++) {
        fstring += charBank[parseInt(Math.random() * charBank.length)];
    };
    return fstring;
}

CommonController.Fetch_App_Versions_Settings = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {

            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let SettingData = await App_Versions_Settings.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -_v').lean();
            resolve(SettingData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_Device_Api_Key = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                ApiKey: values.ApiKey
            };
            if (values.ApiKey === config.SECRET_API_KEY) {
                query = new Object();
            }
            let Result = await App_Devices.findOne(query).select('-_id -_v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_API_KEY } }
            } else {
                resolve(Result);
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Validate_Admin_Selected_Admin = (AdminData, Selected_AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (AdminData.AdminID === Selected_AdminData.AdminID) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.ADMIN_AND_SELECTED_ADMIN_MUST_BE_DIFFERENT } }
            } else {
                resolve("Validated Successfully");
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Validate_Whether_Icon = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Boolify(values.Whether_Icon_Available)) {
                if (values.IconID != null && values.IconID != undefined && values.IconID != "") {
                    let Icon_Information = await CommonController.Check_for_Icon(values);
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } }
                }
            } else {
                resolve("Validated Successfully");
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Common_Validate_Whether_Image = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Boolify(values.Whether_Image_Available)) {
                if (values.ImageID != null && values.ImageID != undefined && values.ImageID != "") {
                    let Image_Information = await CommonController.Check_for_Image(values);
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } }
                }
            } else {
                resolve("Validated Successfully");
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.isNumber = num => {
    if (num != null && num != undefined && String(num) != '' && isFinite(num) && !isNaN(num)) {
        return true;
    } else {
        return false;
    }
}


CommonController.Check_for_Document = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                DocumentID: values.DocumentID
            };
            let Result = await Documents.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.DOCUMENT_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_Image = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                ImageID: values.ImageID
            };
            let Result = await Images.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.IMAGE_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};


CommonController.GENERATE_RANDOM_DIGIT_INCREMENT_COUNTER_SEQUENCE = (CounterID, StartCode, Num) => {
    return new Promise(async (resolve, reject) => {
        try {
            Num = parseInt(Num) || 10;
            CounterID = String(CounterID);
            StartCode = String(StartCode);
            let seq = await CommonController.Generate_Counter_Sequence(CounterID);
            let Unique_Sequnce = StartCode;
            let seq_length = (String(seq).length <= Num) ? String(seq).length : Num;
            let length = Num - seq_length;
            for (let t = 0; t < length; t++) {
                Unique_Sequnce += 0;
            }
            Unique_Sequnce += seq;
            resolve(Unique_Sequnce);
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}
CommonController.GENERATE_TEN_DIGIT_INCREMENT_COUNTER_SEQUENCE = (CounterID, StartCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            CounterID = String(CounterID);
            StartCode = String(StartCode);
            let seq = await CommonController.Generate_Counter_Sequence(CounterID);
            let Unique_Sequnce = StartCode;
            let seq_length = (String(seq).length <= 10) ? String(seq).length : 10;
            let length = 10 - seq_length;
            for (let t = 0; t < length; t++) {
                Unique_Sequnce += 0;
            }
            Unique_Sequnce += seq;
            resolve(Unique_Sequnce);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


CommonController.Generate_Counter_Sequence = (CounterID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                _id: CounterID
            };
            let fndupdchanges = {
                $inc: {
                    "seq": 1
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Result = await Counters.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v').lean();
            resolve(Result.seq);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


CommonController.Common_Floating_Beautify_Value = (Num) => {
    return new Promise(async (resolve, reject) => {
        try {
            let number = parseFloat(Num);
            number = (Math.round(number * 100) / 100);
            resolve(number);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Fetch_Polygon_From_Latlong = (Polygon_Table_Name, lat, lng) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Geometry: {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [
                                parseFloat(lng),
                                parseFloat(lat)
                            ]
                        }
                    }
                },
                Status: true
            };
            let Result = await Polygon_Table_Name.findOne(query).select('-_id -__v').lean();
            resolve(Result);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Date_Validation = (date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (moment(date).isValid()) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_DATE } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_Only_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                USERID: values.USERID
            };
            let Result = await Users.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_USER } }
            } else {
                resolve(Result);
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                USERID: values.USERID
            };
            let Result = await Users.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_USER } }
            } else {
                if ((Result.SessionID === values.SessionID) || (config.SECRET_SESSIONID === values.SessionID)) {
                    if (Result.Status) {
                        resolve(Result);
                    } else {
                        throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                    }
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } }
                }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Generate_Unique_String = (No_of_Digits) => {
    return new Promise(async (resolve, reject) => {
        try {
            let alphabank = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
            let charBank = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ9876543210";
            charBank = charBank.toUpperCase();
            let fstring = alphabank[parseInt(Math.random() * alphabank.length)];
            for (let i = 1; i < No_of_Digits; i++) {
                fstring += charBank[parseInt(Math.random() * charBank.length)];
            }
            resolve(fstring);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};
CommonController.Common_IP_Address = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let IPAddress = req.headers["x-forwarded-for"];
            if (IPAddress) {
                let list = IPAddress.split(",");
                IPAddress = list[list.length - 1];
            } else {
                IPAddress = req.connection.remoteAddress;
            }
            IPAddress = (IPAddress === '::1') ? '0:0:0:0' : IPAddress;
            resolve(IPAddress);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Common_QR_Image_Response = (QR_Image) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(`${config.AWS.S3URL}${QR_Image}`);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Common_Image_Response_Single_Image = (Available, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Available) {
                Data.Image50 = config.AWS.S3URL + Data.Image50;
                Data.Image100 = config.AWS.S3URL + Data.Image100;
                Data.Image250 = config.AWS.S3URL + Data.Image250;
                Data.Image550 = config.AWS.S3URL + Data.Image550;
                Data.Image900 = config.AWS.S3URL + Data.Image900;
                Data.ImageOriginal = config.AWS.S3URL + Data.ImageOriginal;
                resolve(Data);
            } else {
                resolve(Data);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Common_Password_Validation = (Password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Step 1 ---> Validate one Uppercase
            //Step 2 ---> Validate one Lowercase
            //Step 3 ---> Validate one Number
            //Step 4 ---> Validate Password Length(6 to 16)
            //Step 5 ---> Validate Complete Password at once
            if (config.Password_UpperCase.test(Password)) {
                if (config.Password_LowerCase.test(Password)) {
                    if (config.Password_Digits.test(Password)) {
                        if (config.Password_Length.test(Password)) {
                            if (config.Password_Match_Regex.test(Password)) {
                                resolve({ success: true, extras: { Status: CommonMessages.VALIDATED_SUCCESSFULLY } })
                            } else {
                                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PASSWORD } }
                            }
                        } else {
                            throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_BE_BETWEEN_6_AND_16_CHARACTERS } }
                        }
                    } else {
                        throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_NUMBER } }
                    }
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_LOWERCASE } }
                }
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_UPPERCASE } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Random_OTP_Number = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let charBank = "123456789";
            let str = '';
            for (let i = 0; i < 4; i++) {
                str += charBank[parseInt(Math.random() * charBank.length)];
            };
            resolve(str);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Fetch_Admin_Complete_Information = (Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = (typeof Information === "string") ? await CommonController.Check_Only_Admin({ AdminID: Information }) : Information;
            resolve(Data);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Check_Only_Admin = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AdminID: values.AdminID
            }
            let Result = await Admins.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_ADMIN } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Check_for_Admin = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = new Object();
            if (config.AdminID === values.AdminID) {
                query = {
                    Status: true
                };
            } else {
                query = {
                    AdminID: values.AdminID
                };
            }
            let Result = await Admins.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_ADMIN } }
            } else {
                if (Result.SessionID != "") {
                    if (Result.SessionID === values.SessionID || config.SECRET_SESSIONID === values.SessionID || config.SessionID === values.SessionID) {
                        if (Result.Status) {
                            resolve(Result);
                        } else {
                            throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                        }
                    } else {
                        throw { success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } }
                    }
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Common_Phone_Number_Validation = PhoneNumber => {
    return new Promise(async (resolve, reject) => {
        try {
            if (PhoneNumber === null || PhoneNumber === undefined || PhoneNumber === "") {
                resolve("Validated Successfully");
            } else {
                if (validator.isMobilePhone(String(PhoneNumber), "en-IN")) {
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PHONENUMBER } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


CommonController.Common_Email_Validation = EmailID => {
    return new Promise(async (resolve, reject) => {
        try {
            if (EmailID === null || EmailID === undefined || EmailID === "") {
                resolve("Validated Successfully");
            } else {
                if (validator.isEmail(EmailID)) {
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_EMAIL_FORMAT } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Drop_All_Collections_Database = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        let All_Collections = await mongoose.connections[0].collections;
        let Collection_Names = [];
        for (const collectionName of Object.keys(All_Collections)) {
            if (collectionName != 'Admins') {
                Collection_Names.push(collectionName);
                db.dropCollection(collectionName).then(() => {
                    console.log("dropped --->", collectionName);
                }).catch(() => {
                    console.log("catched error --->", collectionName);
                });
            }
        }
        res.json({ success: true, extras: { Status: CommonMessages.DATABASE_DROPPED_SUCCESSFULLY, Data: Collection_Names } });
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
};
CommonController.Fetch_Document_Complete_Information = (Document_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DocumentData = await (typeof Document_Information === "string") ? await CommonController.Check_for_Document({ DocumentID: Document_Information }) : Document_Information;
            DocumentData.Document_URL = await `${config.AWS.S3URL}${DocumentData.Document_URL}`;
            resolve(DocumentData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Document_Array_Complete_Information = (Document_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DocumentData = await (typeof Document_Information === "string") ? await CommonController.Common_Validate_Document_Array({ DocumentID: Document_Information }) : Document_Information;
            for (iterator of DocumentData) {
                iterator.Document_URL = await `${config.AWS.S3URL}${iterator.Document_URL}`;
            }
            resolve(DocumentData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Image_Array_Complete_Information = (Available, Image_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Available) {
                for (iterator of Image_Information) {
                    iterator.Image50 = config.AWS.S3URL + iterator.Image50;
                    iterator.Image100 = config.AWS.S3URL + iterator.Image100;
                    iterator.Image250 = config.AWS.S3URL + iterator.Image250;
                    iterator.Image550 = config.AWS.S3URL + iterator.Image550;
                    iterator.Image900 = config.AWS.S3URL + iterator.Image900;
                    iterator.ImageOriginal = config.AWS.S3URL + iterator.ImageOriginal;
                }
                resolve(Image_Information);
            }
            else {
                resolve(Image_Information);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_GIF_Complete_Information = (GIF_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let GifImageData = await (typeof GIF_Information === "string") ? await CommonController.Check_for_GIF({ Gif_ImageID: GIF_Information }) : GIF_Information;
            GifImageData.Gif_Image_URL = await `${config.AWS.S3URL}${GifImageData.Gif_Image_URL}`;
            resolve(GifImageData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_GIF = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Gif_ImageID: values.Gif_ImageID
            };
            let Result = await Gif_Images.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.GIF_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_Audio = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AudioID: values.AudioID
            };
            let Result = await Audios.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.AUDIO_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Audio_Complete_Information = (Audio_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let AudioData = await (typeof Audio_Information === "string") ? await CommonController.Check_for_Audio({ AudioID: Audio_Information }) : Audio_Information;
            AudioData.Audio_URL = await `${config.AWS.S3URL}${AudioData.Audio_URL}`;
            resolve(AudioData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Fetch_Video_Complete_Information = (Video_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let VideoData = await (typeof Video_Information === "string") ? await CommonController.Check_for_Video({ VideoID: Video_Information }) : await CommonController.Check_for_Video(Video_Information);
            VideoData.Video_Original_URL = await `${config.AWS.S3URL}${VideoData.Video_Original_URL}`;
            VideoData.Thumbnail_Image_Information = await CommonController.Common_Image_Response_Single_Image(VideoData.Whether_Thumbnail_Image_Available, VideoData.Thumbnail_Image_Information);
            for (const item of VideoData.All_Video_Resolutions) {
                item.URL = await `${config.AWS.S3URL}${item.URL}`;
            }
            resolve(VideoData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Check_for_Video = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                VideoID: values.VideoID
            };
            let Result = await Videos.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.VIDEO_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Fetch_Image_Complete_Information = (Image_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ImageData = await (typeof Image_Information === "string") ? await CommonController.Check_for_Image({ ImageID: Image_Information }) : Image_Information;
            ImageData.Image50 = await `${config.AWS.S3URL}${ImageData.Image50}`;
            ImageData.Image100 = await `${config.AWS.S3URL}${ImageData.Image100}`;
            ImageData.Image250 = await `${config.AWS.S3URL}${ImageData.Image250}`;
            ImageData.Image550 = await `${config.AWS.S3URL}${ImageData.Image550}`;
            ImageData.Image900 = await `${config.AWS.S3URL}${ImageData.Image900}`;
            ImageData.ImageOriginal = await `${config.AWS.S3URL}${ImageData.ImageOriginal}`;
            resolve(ImageData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Icon_Complete_Information = (Icon_Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let IconData = await (typeof Icon_Information === "string") ? await CommonController.Check_for_Icon({ IconID: Icon_Information }) : Icon_Information;
            IconData.Icon20 = await `${config.AWS.S3URL}${IconData.Icon20}`;
            IconData.Icon40 = await `${config.AWS.S3URL}${IconData.Icon40}`;
            IconData.Icon60 = await `${config.AWS.S3URL}${IconData.Icon60}`;
            IconData.Icon80 = await `${config.AWS.S3URL}${IconData.Icon80}`;
            IconData.Icon100 = await `${config.AWS.S3URL}${IconData.Icon100}`;
            IconData.IconOriginal = await `${config.AWS.S3URL}${IconData.IconOriginal}`;
            resolve(IconData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
CommonController.Check_for_Icon = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                IconID: values.IconID
            };
            let Result = await Icons.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.ICON_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Response_Handler = (res, Result) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Result.success) {
                if (!res.headersSent) {
                    resolve(res.status(200).json(Result));
                } else {
                    resolve("Already Sent");
                }
            } else if (!Result.success) {
                if (!res.headersSent) {
                    resolve(res.status(400).json(await CommonController.Common_Error_Handler(Result)));
                } else {
                    resolve("Already Sent");
                }
            } else {
                if (!res.headersSent) {
                    resolve(res.status(400).json({ success: false, extras: { code: 2, msg: ApiMessages.SERVER_ERROR } }));
                    throw Result;
                } else {
                    resolve("Already Sent");
                }
            }
        } catch (error) {
            console.error('Something Response Handler--->', error);
        }
    });
}

CommonController.Common_Error_Handler = (error) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.error("Common_Error_Handler---------->", error);
            if (error.success === null || error.success === undefined) {
                if (error instanceof SyntaxError) {
                    resolve({ success: false, extras: { code: 2, msg: ApiMessages.SERVER_ERROR } })
                } else {
                    resolve({ success: false, extras: { code: 2, msg: ApiMessages.DATABASE_ERROR } })
                }
            } else {
                resolve(error);
            }
        } catch (error) {
            console.error('Something Error Handler--->', error);
        }
    });
}

CommonController.Check_for_Api_Key = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let query = {
                    ApiKey: values.ApiKey
                };
                console.log(values.ApiKey)
                let Result = await Devices.findOne(query).lean();
                if (Result == null) {
                    reject({ success: false, extras: { code: 2, msg: ApiMessages.INVALID_API_KEY } })
                } else {
                    resolve(Result);
                };
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

CommonController.Check_for_User_Session = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                USERID: values.USERID
            };
            let Result = await Users.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                reject({ success: false, extras: { code: 1, msg: ApiMessages.INVALID_USER } })
            } else {
                // let ValidateSuspension = await CommonController.Check_For_User_Suspension(Result);
                if ((Result.SessionID === values.SessionID) || (config.SECRET_SESSIONID === values.SessionID)) {
                    if (Result.Status) {
                        resolve(Result);
                    } else {
                        reject({ success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } })
                    }
                } else {
                    reject({ success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } });
                }
            };
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Validate_Document_Array = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = [];
            for (let DocumentID of values.DocumentID) {

                let Document_Information = await CommonController.Check_for_Document({ DocumentID: DocumentID });
                Data.push(Document_Information);
            };
            resolve(Data);
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Validate_Image_Array = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = [];
            for (let ImageID of values.ImageID) {

                let Image_Information = await CommonController.Check_for_Image({ ImageID: ImageID });
                Data.push(Image_Information);
            };
            resolve(Data);
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

CommonController.Random_12_Digit_Number = () => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let charBank = "123456789";
                let str = '';
                for (let i = 0; i < 12; i++) {
                    str += charBank[parseInt(Math.random() * charBank.length)];
                };
                resolve(str);
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

CommonController.Check_for_Secret_Code = values => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                if (values.SECRETCODE == config.SECRETCODE) {
                    resolve("Validated Successfully")
                } else {
                    reject({ success: false, extras: { msg: ApiMessages.INVALID_SECRET_CODE } });
                }
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

CommonController.Check_Only_Blog = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                BlogID: values.BlogID
            }
            let Result = await Blogs.findOne(query).select('-_id -__v').lean();

            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_BLOG_ID } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Blog_Complete_Information = (Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = typeof Information === "string" ? await CommonController.Check_Only_Blog({ BlogID: Information }) : Information;
            Data.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Mobile_Image_Available, Data.Mobile_Image_Information);
            Data.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Web_Image_Available, Data.Web_Image_Information);
            resolve(Data);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

CommonController.Check_Only_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                ProjectID: values.ProjectID
            }
            let Result = await Projects.findOne(query).select('-_id -__v').lean();

            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PROJECT_ID } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Validate_Project_Document_Array = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = [];
            for (let Document_Object of values.Document_Array) {
                let Document_Information = await CommonController.Check_for_Document({ DocumentID: Document_Object.DocumentID });
                let Document_Image_Information = await CommonController.Check_for_Image({ ImageID: Document_Object.Document_ImageID });
                let Document_Data = {
                    Document_Name: Document_Object.Document_Name,
                    Whether_Document_Image_Available: true,
                    Document_Image_Information: Document_Image_Information,
                    Document_Information: Document_Information
                }
                Data.push(Document_Data);
            };
            resolve(Data);
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Project_Document_Array_Complete_Information = (Available, Document_Array) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Available) {
                for (iterator of Document_Array) {
                    iterator.Document_Information.Document_URL = await `${config.AWS.S3URL}${iterator.Document_Information.Document_URL}`;
                    iterator.Document_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Document_Image_Available, iterator.Document_Image_Information);
                }
                resolve(Document_Array);
            } else {
                resolve(Document_Array);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Project_Complete_Information = (Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = typeof Information === "string" ? await CommonController.Check_Only_Project({ ProjectID: Information }) : Information;

            Data.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Mobile_Image_Available, Data.Mobile_Image_Information);
            Data.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Web_Image_Available, Data.Web_Image_Information);

            Data.Baground_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Baground_Image_Available, Data.Baground_Image_Information);
            Data.Location_Highlights_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Location_Highlights_Image_Available, Data.Location_Highlights_Image_Information);
            Data.Project_Highlights_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Project_Highlights_Image_Available, Data.Project_Highlights_Image_Information);
            Data.Amenities_Highlights_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Amenities_Highlights_Image_Available, Data.Amenities_Highlights_Image_Information);

            Data.Mobile_Image_Array_Information = await CommonController.Fetch_Image_Array_Complete_Information(Data.Whether_Mobile_Image_Array_Available, Data.Mobile_Image_Array_Information);
            Data.Web_Image_Array_Information = await CommonController.Fetch_Image_Array_Complete_Information(Data.Whether_Web_Image_Array_Available, Data.Web_Image_Array_Information);

            Data.Document_Array = await CommonController.Fetch_Project_Document_Array_Complete_Information(Data.Whether_Document_Array_Available, Data.Document_Array);
            resolve(Data);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

CommonController.Fetch_Contact_Us_Info = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {

            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let SettingData = await Contact_Us_Info.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -_v').lean();
            resolve(SettingData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


CommonController.Fetch_Why_Work_Withus_Info = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {

            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let SettingData = await Why_Work_Withus.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v').lean();
            resolve(SettingData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_Only_Achievements_and_Rewards = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Achievements_and_RewardsID: values.Achievements_and_RewardsID
            }
            let Result = await Achievements_and_Rewards.findOne(query).select('-_id -__v').lean();

            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_ACHIEVEMENTS_AND_REWARDID } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Achievements_and_Rewards_Complete_Information = (Information) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = typeof Information === "string" ? await CommonController.Check_Only_Achievements_and_Rewards({ Achievements_and_RewardsID: Information }) : Information;
            Data.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Mobile_Image_Available, Data.Mobile_Image_Information);
            Data.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(Data.Whether_Web_Image_Available, Data.Web_Image_Information);
            resolve(Data);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

CommonController.Check_for_BannerID = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                BannerID: values.BannerID
            };
            let Result = await Banners.findOne(query).select("-_id -__v").lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_BANNER_ID } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

CommonController.Check_Only_Home_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Home_ProjectID: values.Home_ProjectID
            }
            let Result = await Home_Projects.findOne(query).select('-_id -__v').lean();

            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_HOME_PROJECT_ID } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Fetch_Client_Testimonials = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {

            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let SettingData = await Client_Testimonials.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v').lean();
            if (SettingData != null) {
                SettingData.Profile_Image_Information = await CommonController.Common_Image_Response_Single_Image(SettingData.Whether_Profile_Image_Available, SettingData.Profile_Image_Information);
                SettingData.Baground_Image_Information = await CommonController.Common_Image_Response_Single_Image(SettingData.Whether_Baground_Image_Available, SettingData.Baground_Image_Information);
                SettingData.Project_Information = await CommonController.Fetch_Project_Complete_Information(SettingData.ProjectID);
            }
            resolve(SettingData);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
module.exports = CommonController;