let UserController = function () { };

//packages
const uuid = require("uuid");
const moment = require("moment");
const https = require("https");
const crypto = require("crypto");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;

//helpers
const CommonMessages = require("../config/CommonMessages");
const ApiMessages = require("../config/ApiMessages");
const AdminController = require("./AdminController");
const ResponseController = require("./ResponseController");
const CommonController = require("./CommonController");


//models
const Devices = require("../models/Devices");
const config = require("../config/config");
const Contact_Form = require("../models/Contact_Form");
const Book_A_Visit_Form = require("../models/Book_A_Visit_Form");
const Blogs = require("../models/Blogs");
const Projects = require("../models/Projects");
const Banners = require("../models/Banners");
const Achievements_and_Rewards = require("../models/Achievements_and_Rewards");
const Home_Projects = require("../models/Home_Projects");


UserController.Filter_All_Blogs = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true
            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };

            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Blogs.countDocuments(query).lean().exec();
            let Result = await Blogs.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {
                let Data = await CommonController.Fetch_Blog_Complete_Information(iterator);

                // iterator.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Mobile_Image_Available, iterator.Mobile_Image_Information);
                // iterator.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Web_Image_Available, iterator.Web_Image_Information);
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Fetch_Blog_Complete_Information = (values, Blog_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Blog_Complete_Information(Blog_Data.BlogID);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

UserController.Filter_All_Projects = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true
            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };

            if (Boolify(values.Whether_Project_Type_Filter)) {
                query.Project_Type = values.Project_Type
            }
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Projects.countDocuments(query).lean().exec();
            let Result = await Projects.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {
                let Data = await CommonController.Fetch_Project_Complete_Information(iterator);

                // iterator.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Mobile_Image_Available, iterator.Mobile_Image_Information);
                // iterator.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Web_Image_Available, iterator.Web_Image_Information);

                // iterator.Mobile_Image_Array_Information = await CommonController.Fetch_Image_Array_Complete_Information(iterator.Whether_Mobile_Image_Array_Available, iterator.Mobile_Image_Array_Information);
                // iterator.Web_Image_Array_Information = await CommonController.Fetch_Image_Array_Complete_Information(iterator.Whether_Web_Image_Array_Available, iterator.Web_Image_Array_Information);
                // iterator.Document_Array = await CommonController.Fetch_Project_Document_Array_Complete_Information(iterator.Whether_Document_Array_Available, iterator.Document_Array);
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Fetch_Project_Complete_Information = (values, Project_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Project_Complete_Information(Project_Data.ProjectID);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};


UserController.Submit_Contact_Form = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = {
                Contact_FormID: uuid.v4(),
                Name: values.Name,
                EmailID: values.EmailID,
                Phone_Number: values.Phone_Number,
                Message: values.Message
            };
            let SaveResult = await Contact_Form(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.SUBMITTED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Submit_Book_A_Visit_Form = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = {
                Book_A_Visit_FormID: uuid.v4(),
                ProjectID: values.ProjectID,
                Name: values.Name,
                EmailID: values.EmailID,
                Phone_Number: values.Phone_Number
            };
            let SaveResult = await Book_A_Visit_Form(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.SUBMITTED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Fetch_Contact_Us_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Contact_Us_Info();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Filter_All_Banners = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                Banner_No: -1
            };
            let query = {
                Status: true
            };

            if (Boolify(values.Whether_Banner_Type_Filter)) {
                query.Banner_Type = parseInt(values.Banner_Type);
            };

            let Count = await Banners.countDocuments(query).lean().exec();
            let Result = await Banners.find(query).select('-_id -__v').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {
                iterator.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Mobile_Image_Available, iterator.Mobile_Image_Information);
                iterator.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Web_Image_Available, iterator.Web_Image_Information);
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Filter_All_Achievements_and_Rewards = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true
            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };

            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };

            let Count = await Achievements_and_Rewards.countDocuments(query).lean().exec();
            let Result = await Achievements_and_Rewards.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {

                let Data = await CommonController.Fetch_Achievements_and_Rewards_Complete_Information(iterator);

                // iterator.Mobile_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Mobile_Image_Available, iterator.Mobile_Image_Information);
                // iterator.Web_Image_Information = await CommonController.Common_Image_Response_Single_Image(iterator.Whether_Web_Image_Available, iterator.Web_Image_Information);
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Fetch_Achievements_and_Rewards_Complete_Information = (values, Achievement_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Achievements_and_Rewards_Complete_Information(Achievement_Data.Achievements_and_RewardsID);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

UserController.Fetch_Why_Work_Withus_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Why_Work_Withus_Info();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Fetch_Client_Testimonials = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Client_Testimonials();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

UserController.Filter_All_Home_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };
            let query = {
                Status: true
            };

            let Count = await Home_Projects.countDocuments(query).lean().exec();
            let Result = await Home_Projects.find(query).select('-_id -__v').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {
                iterator.Project_Information = await CommonController.Fetch_Project_Complete_Information(iterator.ProjectID);
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
module.exports = UserController;
