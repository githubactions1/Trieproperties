const mongoose = require("mongoose");
const Videos = new mongoose.Schema({
    VideoID: { type: String, default: "" },
    Video_Name: { type: String, default: "" },
    Video_Original_URL: { type: String, default: "" },
    videoDuration: { type: Number, default: 0 },
    videoWidth: { type: Number, default: 0 },
    videoHeight: { type: Number, default: 0 },
    contentType: { type: String, default: "" },
    contentSize: { type: Number, default: 0 },
    Whether_All_Resoulution_Converted: { type: Boolean, default: false },
    All_Video_Resolutions: [
        {
            _id: false,
            Resolution: { type: Number, default: 0 },//240, 360, 480, 720, 1080
            URL: { type: String, default: "" },
            videoDuration: { type: Number, default: 0 },
            videoWidth: { type: Number, default: 0 },
            videoHeight: { type: Number, default: 0 },
            contentType: { type: String, default: "" },
        }
    ],
    Whether_Thumbnail_Image_Available: { type: Boolean, default: false },
    Thumbnail_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" },
    },
    Whether_Video_Processed: { type: Boolean, default: false },
    Status: { type: Boolean, default: true },
}, { collection: 'Videos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Videos', Videos);