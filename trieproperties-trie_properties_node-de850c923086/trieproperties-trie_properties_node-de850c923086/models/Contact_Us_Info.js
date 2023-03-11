const mongoose = require("mongoose");
const Contact_Us_Info = new mongoose.Schema({
    Address: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Phone_Number: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Contact_Us_Info', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Contact_Us_Info', Contact_Us_Info);