const mongoose = require("mongoose");
const Contact_Form = new mongoose.Schema({
    Contact_FormID: { type: String, default: "" },
    Name: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Phone_Number: { type: String, default: "" },
    Message: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Contact_Form', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Contact_Form', Contact_Form);