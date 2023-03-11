let AdminController = function () { };


//packages
const uuid = require("uuid");
const moment = require("moment");
const crypto = require("crypto");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;


//helpers
const config = require("../config/config");
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const CommonController = require("./CommonController");
const ResponseController = require("./ResponseController");

//models
const Admins = require("../models/Admins");
const { resolve } = require("path/posix");
const App_Versions_Settings = require("../models/App_Versions_Settings");
const Documents = require("../models/Documents");
const Videos = require("../models/Videos");
const Blogs = require("../models/Blogs");
const Contact_Form = require("../models/Contact_Form");
const Book_A_Visit_Form = require("../models/Book_A_Visit_Form");
const Projects = require("../models/Projects");
const Contact_Us_Info = require("../models/Contact_Us_Info");
const Why_Work_Withus = require("../models/Why_Work_Withus");
const Achievements_and_Rewards = require("../models/Achievements_and_Rewards");
const Banners = require("../models/Banners");
const Home_Projects = require("../models/Home_Projects");
const Client_Testimonials = require("../models/Client_Testimonials");



AdminController.Update_App_Versions_Settings = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {
                $set: {
                    Application_Android_Version: parseFloat(values.Application_Android_Version),
                    Application_IOS_Version: parseFloat(values.Application_IOS_Version),
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Data = await App_Versions_Settings.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -_v').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY, Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_App_Versions_Settings = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_App_Versions_Settings();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Logout = (AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    SessionID: "",
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.LOGOUT_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Activate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactivate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Information = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Name: values.Name,
                    Designation: values.Designation,
                    PhoneNumber: values.PhoneNumber,
                    EmailID: values.EmailID,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            };
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
AdminController.Update_Admin_Information = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Name: values.Name,
                    Designation: values.Designation,
                    PhoneNumber: values.PhoneNumber,
                    EmailID: values.EmailID,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Check_Whether_Admin_Email_Already_Exist = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AdminID: {
                    $ne: AdminData.AdminID
                },
                EmailID: values.EmailID,
                Status: true
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Admin_Complete_Information = (AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Admin_Complete_Information(AdminData);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Admin_Password = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let pass = Password + PasswordSalt;
            let PasswordHash = crypto.createHash('sha512').update(pass).digest("hex");
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    PasswordHash: PasswordHash,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Password = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Old_Password = String(values.Old_Password);
            let New_Password = String(values.New_Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let oldpass = Old_Password + PasswordSalt;
            let newpass = New_Password + PasswordSalt;
            let OldPasswordHash = crypto.createHash('sha512').update(oldpass).digest("hex");
            let NewPasswordHash = crypto.createHash('sha512').update(newpass).digest("hex");
            if (AdminData.PasswordHash === OldPasswordHash) {
                if (OldPasswordHash === NewPasswordHash) {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.OLD_PASSWORD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT } }
                } else {
                    let fndupdquery = {
                        AdminID: AdminData.AdminID
                    };
                    let fndupdchanges = {
                        $set: {
                            PasswordHash: NewPasswordHash,
                            updated_at: new Date()
                        }
                    };
                    let fndupdoptions = {
                        upsert: true,
                        setDefaultsOnInsert: true,
                        new: true
                    }
                    AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                    resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
                }
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_OLD_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.Filter_All_Admin_Users = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                Name: 1
            };
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            if (values.Whether_Status_Filter) {
                query.Status = values.Status;
            }
            let Count = await Admins.countDocuments(query).lean().exec();
            let Result = await Admins.find(query).select('-_id -__v -updated_at  -Point -Geometry -Delivery_Pricings -PasswordHash -PasswordSalt -SessionID').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Create_Admin_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                Name: values.Name,
                Designation: values.Designation,
                PhoneNumber: values.PhoneNumber,
                EmailID: values.EmailID,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                created_at: new Date(),
                updated_at: new Date()
            };
            let SaveResult = await Admins(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Check_Whether_Admin_Email_Already_Exist = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Status: true
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.Check_Whether_Admin_Email_Registered = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_NOT_REGISTERED } }
            } else {
                if (Result.Status) {
                    resolve(Result);
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Login = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let pass = Password + PasswordSalt;
            let PasswordHash = crypto.createHash('sha512').update(pass).digest("hex");
            if (AdminData.PasswordHash === PasswordHash) {
                let fndupdquery = {
                    AdminID: AdminData.AdminID
                };
                let fndupdchanges = {
                    $set: {
                        SessionID: uuid.v4(),
                        updated_at: new Date()
                    }
                };
                let fndupdoptions = {
                    upsert: true,
                    setDefaultsOnInsert: true,
                    new: true
                };
                AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                resolve({ success: true, extras: { Status: CommonMessages.LOGIN_SUCCESSFULLY, AdminData: AdminData } })
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

//Blogs

AdminController.Create_Blog = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            let Data = {
                BlogID: uuid.v4(),
                Blog_Name: values.Blog_Name,
                Description: values.Description,
                Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                Mobile_Image_Information: Mobile_Image_Information,
                Whether_Web_Image_Available: Whether_Web_Image_Available,
                Web_Image_Information: Web_Image_Information
            };
            let SaveResult = await Blogs(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Blog = (values, BlogData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            let query = {
                BlogID: BlogData.BlogID
            };
            let changes = {
                $set: {
                    Blog_Name: values.Blog_Name,
                    Description: values.Description,
                    Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                    Mobile_Image_Information: Mobile_Image_Information,
                    Whether_Web_Image_Available: Whether_Web_Image_Available,
                    Web_Image_Information: Web_Image_Information
                }
            };
            BlogData = await Blogs.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Blog = (values, BlogData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                BlogID: BlogData.BlogID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            BlogData = await Blogs.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Active_Blog = (values, BlogData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                BlogID: BlogData.BlogID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            BlogData = await Blogs.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Blogs = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {

            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };
            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = values.Status
            }
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Blogs.countDocuments(query).lean().exec();
            let Result = await Blogs.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
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

AdminController.Create_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Images

            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            //Background Image

            let Whether_Baground_Image_Available = false;
            let Baground_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Baground_Image_Available)) {
                Whether_Baground_Image_Available = true;
                Baground_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Baground_ImageID });
            };

            // ProjecT Highlight Image

            let Whether_Project_Highlights_Image_Available = false;
            let Project_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Project_Highlights_Image_Available)) {
                Whether_Project_Highlights_Image_Available = true;
                Project_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Project_Highlights_ImageID });
            };

            //Location Highlight Image

            let Whether_Location_Highlights_Image_Available = false;
            let Location_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Location_Highlights_Image_Available)) {
                Whether_Location_Highlights_Image_Available = true;
                Location_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Location_Highlights_ImageID });
            };

            //Amenities Highlight Image

            let Whether_Amenities_Highlights_Image_Available = false;
            let Amenities_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Amenities_Highlights_Image_Available)) {
                Whether_Amenities_Highlights_Image_Available = true;
                Amenities_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Amenities_Highlights_ImageID });
            };

            //Images Array

            let Whether_Mobile_Image_Array_Available = false;
            let Mobile_Image_Array_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Array_Available)) {
                Whether_Mobile_Image_Array_Available = true;
                Mobile_Image_Array_Information = await CommonController.Common_Validate_Image_Array({ ImageID: values.Mobile_ImageID_Array });
            };

            let Whether_Web_Image_Array_Available = false;
            let Web_Image_Array_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Array_Available)) {
                Whether_Web_Image_Array_Available = true;
                Web_Image_Array_Information = await CommonController.Common_Validate_Image_Array({ ImageID: values.Web_ImageID_Array });
            };

            //Document Array

            let Whether_Document_Array_Available = false;
            let Document_Array = [{
                Document_Name: "",
                Whether_Document_Image_Available: false,
                Document_Image_Information: config.Default_Image_Information,
                Document_Information: config.Default_Document_Information
            }]

            if (Boolify(values.Whether_Document_Array_Available)) {
                Whether_Document_Array_Available = true;
                Document_Array = await CommonController.Common_Validate_Project_Document_Array(values);
            };

            let Data = {
                ProjectID: uuid.v4(),
                Project_Type: values.Project_Type,
                Project_Name: values.Project_Name,
                Description: values.Description,
                Project_Highlights: values.Project_Highlights,
                Location_Highlights: values.Location_Highlights,
                Amenities_Highlights: values.Amenities_Highlights,

                Whether_Project_Highlights_Image_Available: Whether_Project_Highlights_Image_Available,
                Project_Highlights_Image_Information: Project_Highlights_Image_Information,

                Whether_Location_Highlights_Image_Available: Whether_Location_Highlights_Image_Available,
                Location_Highlights_Image_Information: Location_Highlights_Image_Information,

                Whether_Amenities_Highlights_Image_Available: Whether_Amenities_Highlights_Image_Available,
                Amenities_Highlights_Image_Information: Amenities_Highlights_Image_Information,

                Whether_Baground_Image_Available: Whether_Baground_Image_Available,
                Baground_Image_Information: Baground_Image_Information,

                Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                Mobile_Image_Information: Mobile_Image_Information,
                Whether_Web_Image_Available: Whether_Web_Image_Available,
                Web_Image_Information: Web_Image_Information,

                Whether_Mobile_Image_Array_Available: Whether_Mobile_Image_Array_Available,
                Mobile_Image_Array_Information: Mobile_Image_Array_Information,
                Whether_Web_Image_Array_Available: Whether_Web_Image_Array_Available,
                Web_Image_Array_Information: Web_Image_Array_Information,

                Whether_Document_Array_Available: Whether_Document_Array_Available,
                Document_Array: Document_Array
            };
            let SaveResult = await Projects(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Project = (values, Project_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Images

            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            //Background Image

            let Whether_Baground_Image_Available = false;
            let Baground_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Baground_Image_Available)) {
                Whether_Baground_Image_Available = true;
                Baground_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Baground_ImageID });
            };

            // ProjecT Highlight Image

            let Whether_Project_Highlights_Image_Available = false;
            let Project_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Project_Highlights_Image_Available)) {
                Whether_Project_Highlights_Image_Available = true;
                Project_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Project_Highlights_ImageID });
            };

            //Location Highlight Image

            let Whether_Location_Highlights_Image_Available = false;
            let Location_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Location_Highlights_Image_Available)) {
                Whether_Location_Highlights_Image_Available = true;
                Location_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Location_Highlights_ImageID });
            };

            //Amenities Highlight Image

            let Whether_Amenities_Highlights_Image_Available = false;
            let Amenities_Highlights_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Amenities_Highlights_Image_Available)) {
                Whether_Amenities_Highlights_Image_Available = true;
                Amenities_Highlights_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Amenities_Highlights_ImageID });
            };

            //Images Array

            let Whether_Mobile_Image_Array_Available = false;
            let Mobile_Image_Array_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Array_Available)) {
                Whether_Mobile_Image_Array_Available = true;
                Mobile_Image_Array_Information = await CommonController.Common_Validate_Image_Array({ ImageID: values.Mobile_ImageID_Array });
            };

            let Whether_Web_Image_Array_Available = false;
            let Web_Image_Array_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Array_Available)) {
                Whether_Web_Image_Array_Available = true;
                Web_Image_Array_Information = await CommonController.Common_Validate_Image_Array({ ImageID: values.Web_ImageID_Array });
            };
            console.log("Enterdd==>797")

            //Document Array

            let Whether_Document_Array_Available = false;
            let Document_Array = [{
                Document_Name: "",
                Whether_Document_Image_Available: false,
                Document_Image_Information: config.Default_Image_Information,
                Document_Information: config.Default_Document_Information
            }]

            if (Boolify(values.Whether_Document_Array_Available)) {
                Whether_Document_Array_Available = true;
                Document_Array = await CommonController.Common_Validate_Project_Document_Array(values);
            };

            let query = {
                ProjectID: Project_Data.ProjectID
            };
            let changes = {
                $set: {
                    Project_Type: values.Project_Type,
                    Project_Name: values.Project_Name,
                    Description: values.Description,
                    Project_Highlights: values.Project_Highlights,
                    Location_Highlights: values.Location_Highlights,
                    Amenities_Highlights: values.Amenities_Highlights,

                    Whether_Project_Highlights_Image_Available: Whether_Project_Highlights_Image_Available,
                    Project_Highlights_Image_Information: Project_Highlights_Image_Information,

                    Whether_Location_Highlights_Image_Available: Whether_Location_Highlights_Image_Available,
                    Location_Highlights_Image_Information: Location_Highlights_Image_Information,

                    Whether_Amenities_Highlights_Image_Available: Whether_Amenities_Highlights_Image_Available,
                    Amenities_Highlights_Image_Information: Amenities_Highlights_Image_Information,

                    Whether_Baground_Image_Available: Whether_Baground_Image_Available,
                    Baground_Image_Information: Baground_Image_Information,

                    Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                    Mobile_Image_Information: Mobile_Image_Information,
                    Whether_Web_Image_Available: Whether_Web_Image_Available,
                    Web_Image_Information: Web_Image_Information,

                    Whether_Mobile_Image_Array_Available: Whether_Mobile_Image_Array_Available,
                    Mobile_Image_Array_Information: Mobile_Image_Array_Information,
                    Whether_Web_Image_Array_Available: Whether_Web_Image_Array_Available,
                    Web_Image_Array_Information: Web_Image_Array_Information,

                    Whether_Document_Array_Available: Whether_Document_Array_Available,
                    Document_Array: Document_Array
                }
            };
            Project_Data = await Projects.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Project = (values, Project_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                ProjectID: Project_Data.ProjectID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            Project_Data = await Projects.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Active_Project = (values, Project_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                ProjectID: Project_Data.ProjectID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            Project_Data = await Projects.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Projects = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {

            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };
            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = values.Status
            }

            if (Boolify(values.Whether_Project_Type_Filter)) {
                query.Project_Type = values.Project_Type
            }
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };

            if (Boolify(values.Whether_Search_Filter)) {
                let Search_Input = String(values.Search_Input);
                let Search_Options = {
                    $regex: Search_Input,
                    $options: "i"
                };
                query.$or = [
                    {
                        Project_Name: Search_Options
                    },
                    {
                        Description: Search_Options
                    }
                ]
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

AdminController.Filter_All_Cotact_Forms = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {

            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };

            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Contact_Form.countDocuments(query).lean().exec();
            let Result = await Contact_Form.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Book_A_Visit_Forms = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {

            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };

            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Book_A_Visit_Form.countDocuments(query).lean().exec();
            let Result = await Book_A_Visit_Form.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            for (let iterator of Result) {
                iterator.Project_Information = await CommonController.Fetch_Project_Complete_Information(iterator.ProjectID)
            }
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Contact_Us_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {
                $set: {
                    Address: values.Address,
                    EmailID: values.EmailID,
                    Phone_Number: values.Phone_Number
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Data = await Contact_Us_Info.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -_v').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY, Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Contact_Us_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Contact_Us_Info();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Why_Work_Withus_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {
                $set: {
                    Description: values.Description,
                    Experience: values.Experience,
                    Residential_Projects: values.Residential_Projects,
                    Commercial_Projects: values.Commercial_Projects,
                    Million_Sq_ft: values.Million_Sq_ft
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Data = await Why_Work_Withus.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY, Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Why_Work_Withus_Info = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Why_Work_Withus_Info();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Create_Achievements_and_Rewards = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            let Data = {
                Achievements_and_RewardsID: uuid.v4(),
                Achievements_Name: values.Achievements_Name,
                Description: values.Description,
                Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                Mobile_Image_Information: Mobile_Image_Information,
                Whether_Web_Image_Available: Whether_Web_Image_Available,
                Web_Image_Information: Web_Image_Information
            };
            let SaveResult = await Achievements_and_Rewards(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Achievements_and_Rewards = (values, AchievementData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            let query = {
                Achievements_and_RewardsID: AchievementData.Achievements_and_RewardsID
            };
            let changes = {
                $set: {
                    Achievements_Name: values.Achievements_Name,
                    Description: values.Description,
                    Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                    Mobile_Image_Information: Mobile_Image_Information,
                    Whether_Web_Image_Available: Whether_Web_Image_Available,
                    Web_Image_Information: Web_Image_Information
                }
            };
            AchievementData = await Achievements_and_Rewards.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Achievements_and_Rewards = (values, AchievementData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                Achievements_and_RewardsID: AchievementData.Achievements_and_RewardsID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AchievementData = await Achievements_and_Rewards.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Active_Achievements_and_Rewards = (values, AchievementData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                Achievements_and_RewardsID: AchievementData.Achievements_and_RewardsID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AchievementData = await Achievements_and_Rewards.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Achievements_and_Rewards = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {

            };
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };
            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = values.Status
            }
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };

            if (Boolify(values.Whether_Search_Filter)) {
                let Search_Input = String(values.Search_Input);
                let Search_Options = {
                    $regex: Search_Input,
                    $options: "i"
                };
                query.$or = [
                    {
                        Achievements_Name: Search_Options
                    },
                    {
                        Description: Search_Options
                    }
                ]
            };
            let Count = await Achievements_and_Rewards.countDocuments(query).lean().exec();
            let Result = await Achievements_and_Rewards.find(query).select('-_id -__v -updated_at').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
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

// Banners

AdminController.Check_Whether_Banner_SNo_Available = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                BannerID: {
                    $ne: values.BannerID
                },
                Banner_No: values.Banner_No,
            }
            let Result = await Banners.findOne(query).lean().exec();
            if (Result == null) {
                resolve('SNo Available');
            } else {
                reject({ success: false, extras: { code: 2, msg: ApiMessages.NUMBER_ALREADY_EXIST } })
            }
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

AdminController.Create_Banner = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };
            let Data = {
                BannerID: uuid.v4(),
                Banner_No: values.Banner_No,
                Banner_Type: values.Banner_Type,
                Banner_Title: values.Banner_Title,
                Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                Mobile_Image_Information: Mobile_Image_Information,
                Whether_Web_Image_Available: Whether_Web_Image_Available,
                Web_Image_Information: Web_Image_Information
            };
            let SaveResult = await Banners(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Banner = (values, BannerData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Whether_Mobile_Image_Available = false;
            let Mobile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Mobile_Image_Available)) {
                Whether_Mobile_Image_Available = true;
                Mobile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Mobile_ImageID });
            };

            let Whether_Web_Image_Available = false;
            let Web_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Web_Image_Available)) {
                Whether_Web_Image_Available = true;
                Web_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Web_ImageID });
            };

            let query = {
                BannerID: BannerData.BannerID
            };
            let changes = {
                $set: {
                    Banner_No: values.Banner_No,
                    Banner_Type: values.Banner_Type,
                    Banner_Title: values.Banner_Title,
                    Whether_Mobile_Image_Available: Whether_Mobile_Image_Available,
                    Mobile_Image_Information: Mobile_Image_Information,
                    Whether_Web_Image_Available: Whether_Web_Image_Available,
                    Web_Image_Information: Web_Image_Information
                }
            };
            BannerData = await Banners.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Banner = (values, BannerData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                BannerID: BannerData.BannerID
            };
            let changes = {
                $set: {
                    Status: false
                }
            };
            let UpdatedStatus = await Banners.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Active_Banner = (values, BannerData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                BannerID: BannerData.BannerID
            };
            let changes = {
                $set: {
                    Status: true
                }
            };
            let UpdatedStatus = await Banners.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Banners = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                Banner_No: -1
            };
            let query = {
            };

            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = Boolify(values.Status);
            };

            if (Boolify(values.Whether_Banner_Type_Filter)) {
                query.Banner_Type = parseInt(values.Banner_Type);
            };

            if (Boolify(values.Whether_Search_Filter)) {
                let Search_Input = String(values.Search_Input);
                let Search_Options = {
                    $regex: Search_Input,
                    $options: "i"
                };
                query.$or = [
                    {
                        Banner_Title: Search_Options
                    },
                ]
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

//Home Projects

AdminController.Check_Whether_Home_Project_Exist = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Home_ProjectID: {
                    $ne: values.Home_ProjectID
                },
                ProjectID: values.ProjectID
            }
            let Result = await Home_Projects.findOne(query).lean().exec();
            if (Result == null) {
                resolve("Validated Successfully");
            } else {
                reject({ success: false, extras: { code: 2, msg: ApiMessages.PROJECT_ALREADY_EXIST } })
            }
        } catch (error) {
            reject(await CommonController.Common_Error_Handler(error));
        }
    });
}

AdminController.Add_Home_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = {
                Home_ProjectID: uuid.v4(),
                ProjectID: values.ProjectID
            };
            let SaveResult = await Home_Projects(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.ADDED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Home_Project = (values, HomeProject_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Home_ProjectID: HomeProject_Data.Home_ProjectID
            };
            let changes = {
                $set: {
                    Status: false
                }
            };
            let UpdatedStatus = await Home_Projects.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Active_Home_Project = (values, HomeProject_Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Home_ProjectID: HomeProject_Data.Home_ProjectID
            };
            let changes = {
                $set: {
                    Status: true
                }
            };
            let UpdatedStatus = await Home_Projects.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Home_Project = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let toSkip = parseInt(values.Skip);
            let toLimit = parseInt(values.Limit);
            let sortOptions = {
                created_at: -1
            };
            let query = {
            };

            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = Boolify(values.Status);
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

//Client Testimonials

AdminController.Update_Client_Testimonials = values => {
    return new Promise(async (resolve, reject) => {
        try {

            let Whether_Profile_Image_Available = false;
            let Profile_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Profile_Image_Available)) {
                Whether_Profile_Image_Available = true;
                Profile_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Profile_ImageID });
            };

            let Whether_Baground_Image_Available = false;
            let Baground_Image_Information = config.Default_Image_Information;

            if (Boolify(values.Whether_Baground_Image_Available)) {
                Whether_Baground_Image_Available = true;
                Baground_Image_Information = await CommonController.Check_for_Image({ ImageID: values.Baground_ImageID });
            };

            let fndupdquery = {

            };
            let fndupdchanges = {
                $set: {
                    Main_Description: values.Main_Description,
                    Profile_Name: values.Profile_Name,
                    Profile_Heading: values.Profile_Heading,
                    Profile_Description: values.Profile_Description,
                    ProjectID: values.ProjectID,

                    Whether_Profile_Image_Available: Whether_Profile_Image_Available,
                    Profile_Image_Information: Profile_Image_Information,
                    Whether_Baground_Image_Available: Whether_Baground_Image_Available,
                    Baground_Image_Information: Baground_Image_Information
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Data = await Client_Testimonials.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Client_Testimonials = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Client_Testimonials();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
module.exports = AdminController;