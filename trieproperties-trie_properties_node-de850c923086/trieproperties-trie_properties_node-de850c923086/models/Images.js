const mongoose = require('mongoose');
const Images = new mongoose.Schema({
    ImageID: { type: String, default: "" },
    Image50: { type: String, default: "" },
    Image100: { type: String, default: "" },
    Image250: { type: String, default: "" },
    Image550: { type: String, default: "" },
    Image900: { type: String, default: "" },
    ImageOriginal: { type: String, default: "" },
    contentType: { type: String, default: "" },
    contentSize: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Images', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Images', Images);