const mongoose = require("mongoose");
const Book_A_Visit_Form = new mongoose.Schema({
    Book_A_Visit_FormID: { type: String, default: "" },
    ProjectID: { type: String, default: "" },
    Name: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Phone_Number: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Book_A_Visit_Form', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Book_A_Visit_Form', Book_A_Visit_Form);