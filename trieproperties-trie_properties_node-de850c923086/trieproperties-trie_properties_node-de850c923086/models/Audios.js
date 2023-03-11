const mongoose = require("mongoose");
const Audios = new mongoose.Schema({
    AudioID: { type: String, default: "" },
    Audio_URL: { type: String, default: "" },
    contentType: { type: String, default: "" },
    contentSize: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Audios', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Audios', Audios);