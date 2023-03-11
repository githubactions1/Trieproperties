const mongoose = require("mongoose");
const Blogs = new mongoose.Schema({
    BlogID: { type: String, default: "" },
    Blog_Name: { type: String, default: "" },
    Description: { type: String, default: "" },
    Whether_Mobile_Image_Available: { type: Boolean, default: false },
    Mobile_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },
    Whether_Web_Image_Available: { type: Boolean, default: false },
    Web_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },
    Status: { type: Boolean, default: true },
}, { collection: 'Blogs', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Blogs', Blogs);