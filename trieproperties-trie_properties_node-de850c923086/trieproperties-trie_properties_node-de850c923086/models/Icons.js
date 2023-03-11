const mongoose = require("mongoose");
const Icons = new mongoose.Schema({
    IconID: { type: String, default: "" },
    Icon20: { type: String, default: "" },
    Icon40: { type: String, default: "" },
    Icon60: { type: String, default: "" },
    Icon80: { type: String, default: "" },
    Icon100: { type: String, default: "" },
    IconOriginal: { type: String, default: "" },
    contentType: { type: String, default: "" },
    contentSize: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Icons', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Icons', Icons);