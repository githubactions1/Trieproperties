const mongoose = require("mongoose");
const Gif_Images = new mongoose.Schema({
    Gif_ImageID: { type: String, default: "" },
    Gif_Image_URL: { type: String, default: "" },
    contentType: { type: String, default: "" },
    contentSize: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Gif_Images', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Gif_Images', Gif_Images);