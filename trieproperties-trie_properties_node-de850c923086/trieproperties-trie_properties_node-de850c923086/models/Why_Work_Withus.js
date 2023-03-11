const mongoose = require("mongoose");
const Why_Work_Withus = new mongoose.Schema({
    Description: { type: String, default: "" },
    Experience: { type: Number, default: 0 },
    Residential_Projects: { type: Number, default: 0 },
    Commercial_Projects: { type: Number, default: 0 },
    Million_Sq_ft: { type: Number, default: 0 },
    Status: { type: Boolean, default: true },
}, { collection: 'Why_Work_Withus', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Why_Work_Withus', Why_Work_Withus);