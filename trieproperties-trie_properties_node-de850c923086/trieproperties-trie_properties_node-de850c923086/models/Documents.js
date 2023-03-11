const mongoose = require("mongoose");
const Documents = new mongoose.Schema({
    DocumentID: { type: String, default: "" },
    Document_URL: { type: String, default: "" },
    contentType: { type: String, default: "" },
    contentSize: { type: String, default: "" },
}, { collection: 'Documents', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Documents', Documents);