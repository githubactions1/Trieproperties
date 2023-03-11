const mongoose = require("mongoose");
const Client_Testimonials = new mongoose.Schema({
    Main_Description: { type: String, default: "" },
    //Profile
    Profile_Name: { type: String, default: "" },
    Profile_Heading: { type: String, default: "" },
    Profile_Description: { type: String, default: "" },
    ProjectID: { type: String, default: "" },
    //Profile Image
    Whether_Profile_Image_Available: { type: Boolean, default: false },
    Profile_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },
    //Background Image
    Whether_Baground_Image_Available: { type: Boolean, default: false },
    Baground_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },
    Status: { type: Boolean, default: true },
}, { collection: 'Client_Testimonials', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Client_Testimonials', Client_Testimonials);