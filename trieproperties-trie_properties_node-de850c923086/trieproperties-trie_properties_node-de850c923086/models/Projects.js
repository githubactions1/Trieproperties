const mongoose = require("mongoose");
const Projects = new mongoose.Schema({
    ProjectID: { type: String, default: "" },
    Project_Type: { type: Number, default: 0 }, //1.Ongoing, 2.Upcoming, 3.Completed
    Project_Name: { type: String, default: "" },
    Description: { type: String, default: "" },
    Project_Highlights: [{ type: String, default: "" }],
    Location_Highlights: [{ type: String, default: "" }],
    Amenities_Highlights: [{ type: String, default: "" }],

    //Image
    Whether_Mobile_Image_Available: { type: Boolean, default: false },
    Mobile_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },
    Whether_Web_Image_Available: { type: Boolean, default: false },
    Web_Image_Information: {
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

    //Location Highlight Image
    Whether_Location_Highlights_Image_Available: { type: Boolean, default: false },
    Location_Highlights_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },

    //Project Highlight Image
    Whether_Project_Highlights_Image_Available: { type: Boolean, default: false },
    Project_Highlights_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },

    //Amenities Highlight Image
    Whether_Amenities_Highlights_Image_Available: { type: Boolean, default: false },
    Amenities_Highlights_Image_Information: {
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" }
    },

    // Image Array
    Whether_Mobile_Image_Array_Available: { type: Boolean, default: false },
    Mobile_Image_Array_Information: [{
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" },
    }],

    Whether_Web_Image_Array_Available: { type: Boolean, default: false },
    Web_Image_Array_Information: [{
        ImageID: { type: String, default: "" },
        Image50: { type: String, default: "" },
        Image100: { type: String, default: "" },
        Image250: { type: String, default: "" },
        Image550: { type: String, default: "" },
        Image900: { type: String, default: "" },
        ImageOriginal: { type: String, default: "" },
    }],

    //Document
    Whether_Document_Array_Available: { type: Boolean, default: false },
    Document_Array: [{
        Document_Name: { type: String, default: "" },
        Whether_Document_Image_Available: { type: Boolean, default: false },
        Document_Image_Information: {
            ImageID: { type: String, default: "" },
            Image50: { type: String, default: "" },
            Image100: { type: String, default: "" },
            Image250: { type: String, default: "" },
            Image550: { type: String, default: "" },
            Image900: { type: String, default: "" },
            ImageOriginal: { type: String, default: "" }
        },
        Document_Information: {
            DocumentID: { type: String, default: "" },
            Document_URL: { type: String, default: "" },
            contentType: { type: String, default: "" },
            contentSize: { type: String, default: "" },
        }
    }],
    Status: { type: Boolean, default: true },
}, { collection: 'Projects', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Projects', Projects);