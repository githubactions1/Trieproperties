let AdminMediator = function () { };

const CommonController = require("../controllers/CommonController");
const AdminController = require("../controllers/AdminController");
const ApiMessages = require("../config/ApiMessages");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;
const ResponseController = require("../controllers/ResponseController");


AdminMediator.Update_App_Versions_Settings = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Application_Android_Version)
            && CommonController.isNumber(values.Application_IOS_Version)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Update_App_Versions_Settings(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await CommonController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Fetch_App_Versions_Settings = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_App_Versions_Settings(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Logout = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null
        ) {
            let AdminData = await CommonController.Check_Only_Admin(values);
            let Result = await AdminController.Logout(AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Activate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Activate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Inactivate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Inactivate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, AdminData);
            let Result = await AdminController.Update_Information(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Admin_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            let Result = await AdminController.Update_Admin_Information(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Update_Admin_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Password != null && values.Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Update_Admin_Password(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Update_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Old_Password != null && values.Old_Password != ''
            && values.New_Password != null && values.New_Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Password_Validation(values.New_Password);
            let Result = await AdminController.Update_Password(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Filter_All_Admin_Users = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Admin_Users(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Create_Admin_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.PhoneNumber);
            ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Admin_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Admin_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_Admin_Complete_Information(AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Common_Password_Validation = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Password != null && values.Password != undefined && typeof (values.Password) === "string"
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await CommonController.Common_Password_Validation(values.Password);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } }
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
AdminMediator.Login = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let ValidityStatus = CommonController.Common_Email_Validation(values.EmailID);
            let AdminData = await AdminController.Check_Whether_Admin_Email_Registered(values);
            let Result = await AdminController.Login(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Blogs

AdminMediator.Create_Blog = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Blog_Name != null && values.Blog_Name != ''
            && values.Description != null
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Create_Blog(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Blog = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BlogID != null
            && values.Blog_Name != null && values.Blog_Name != ''
            && values.Description != null
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BlogData = await CommonController.Check_Only_Blog(values);
            let Result = await AdminController.Update_Blog(values, BlogData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Blog = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BlogID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BlogData = await CommonController.Check_Only_Blog(values);
            let Result = await AdminController.Inactive_Blog(values, BlogData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Active_Blog = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BlogID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BlogData = await CommonController.Check_Only_Blog(values);
            let Result = await AdminController.Active_Blog(values, BlogData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Blogs = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Blogs(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Projects

AdminMediator.Create_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Project_Type)
            && values.Project_Name != null && values.Project_Name != ''
            && values.Description != null
            && values.Project_Highlights != null
            && values.Location_Highlights != null
            && values.Amenities_Highlights != null

            && values.Whether_Project_Highlights_Image_Available != null && isBoolean(values.Whether_Project_Highlights_Image_Available)
            && values.Whether_Location_Highlights_Image_Available != null && isBoolean(values.Whether_Location_Highlights_Image_Available)
            && values.Whether_Amenities_Highlights_Image_Available != null && isBoolean(values.Whether_Amenities_Highlights_Image_Available)
            && values.Whether_Baground_Image_Available != null && isBoolean(values.Whether_Baground_Image_Available)


            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
            && values.Whether_Mobile_Image_Array_Available != null && isBoolean(values.Whether_Mobile_Image_Array_Available)
            && values.Whether_Web_Image_Array_Available != null && isBoolean(values.Whether_Web_Image_Array_Available)

            && values.Whether_Document_Array_Available != null && isBoolean(values.Whether_Document_Array_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Create_Project(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.ProjectID != null
            && CommonController.isNumber(values.Project_Type)
            && values.Project_Name != null && values.Project_Name != ''
            && values.Description != null
            && values.Project_Highlights != null
            && values.Location_Highlights != null
            && values.Amenities_Highlights != null

            && values.Whether_Project_Highlights_Image_Available != null && isBoolean(values.Whether_Project_Highlights_Image_Available)
            && values.Whether_Location_Highlights_Image_Available != null && isBoolean(values.Whether_Location_Highlights_Image_Available)
            && values.Whether_Amenities_Highlights_Image_Available != null && isBoolean(values.Whether_Amenities_Highlights_Image_Available)
            && values.Whether_Baground_Image_Available != null && isBoolean(values.Whether_Baground_Image_Available)

            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
            && values.Whether_Mobile_Image_Array_Available != null && isBoolean(values.Whether_Mobile_Image_Array_Available)
            && values.Whether_Web_Image_Array_Available != null && isBoolean(values.Whether_Web_Image_Array_Available)

            && values.Whether_Document_Array_Available != null && isBoolean(values.Whether_Document_Array_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await AdminController.Update_Project(values, Project_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.ProjectID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await AdminController.Inactive_Project(values, Project_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Active_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.ProjectID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await AdminController.Active_Project(values, Project_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Projects = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Projects(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Cotact_Forms = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Cotact_Forms(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Book_A_Visit_Forms = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Book_A_Visit_Forms(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Update_Contact_Us_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Address != null
            && values.EmailID != null
            && values.Phone_Number != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.Phone_Number);
            let Result = await AdminController.Update_Contact_Us_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await CommonController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Contact_Us_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_Contact_Us_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Why_Work_Withus_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Description != null && values.Description != ""
            && CommonController.isNumber(values.Experience)
            && CommonController.isNumber(values.Residential_Projects)
            && CommonController.isNumber(values.Commercial_Projects)
            && CommonController.isNumber(values.Million_Sq_ft)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Update_Why_Work_Withus_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await CommonController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Why_Work_Withus_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_Why_Work_Withus_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Achievements and Rewards

AdminMediator.Create_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Achievements_Name != null && values.Achievements_Name != ''
            && values.Description != null
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Create_Achievements_and_Rewards(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Achievements_and_RewardsID != null
            && values.Achievements_Name != null && values.Achievements_Name != ''
            && values.Description != null
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let AchievementData = await CommonController.Check_Only_Achievements_and_Rewards(values);
            let Result = await AdminController.Update_Achievements_and_Rewards(values, AchievementData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Achievements_and_RewardsID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let AchievementData = await CommonController.Check_Only_Achievements_and_Rewards(values);
            let Result = await AdminController.Inactive_Achievements_and_Rewards(values, AchievementData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Active_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Achievements_and_RewardsID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let AchievementData = await CommonController.Check_Only_Achievements_and_Rewards(values);
            let Result = await AdminController.Active_Achievements_and_Rewards(values, AchievementData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Achievements_and_Rewards(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Banners

AdminMediator.Create_Banner = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Banner_No)
            && CommonController.isNumber(values.Banner_Type)
            && values.Banner_Title != null && values.Banner_Title != ""
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let VaalidityStatus = await AdminController.Check_Whether_Banner_SNo_Available(values);
            let Result = await AdminController.Create_Banner(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Banner = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BannerID != null && values.BannerID != ''
            && CommonController.isNumber(values.Banner_No)
            && CommonController.isNumber(values.Banner_Type)
            && values.Banner_Title != null && values.Banner_Title != ""
            && values.Whether_Mobile_Image_Available != null && isBoolean(values.Whether_Mobile_Image_Available)
            && values.Whether_Web_Image_Available != null && isBoolean(values.Whether_Web_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BannerData = await CommonController.Check_for_BannerID(values);
            let VaalidityStatus = await AdminController.Check_Whether_Banner_SNo_Available(values);
            let Result = await AdminController.Update_Banner(values, BannerData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Banner = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BannerID != null && values.BannerID != ""
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BannerData = await CommonController.Check_for_BannerID(values);
            let Result = await AdminController.Inactive_Banner(values, BannerData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
};

AdminMediator.Active_Banner = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.BannerID != null && values.BannerID != ""
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let BannerData = await CommonController.Check_for_BannerID(values);
            let Result = await AdminController.Active_Banner(values, BannerData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
};

AdminMediator.Filter_All_Banners = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Banners(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Home Projects

AdminMediator.Add_Home_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.ProjectID != null && values.ProjectID != ""
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let ValidityStatus = await AdminController.Check_Whether_Home_Project_Exist(values);
            let Result = await AdminController.Add_Home_Project(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Active_Home_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Home_ProjectID != null && values.Home_ProjectID != ""
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let HomeProject_Data = await CommonController.Check_Only_Home_Project(values);
            let Result = await AdminController.Active_Home_Project(values, HomeProject_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Home_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Home_ProjectID != null && values.Home_ProjectID != ""
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let HomeProject_Data = await CommonController.Check_Only_Home_Project(values);
            let Result = await AdminController.Inactive_Home_Project(values, HomeProject_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Home_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Home_Project(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//Client Testimonials

AdminMediator.Update_Client_Testimonials = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Main_Description != null && values.Main_Description != ""

            && values.Profile_Name != null && values.Profile_Name != ""
            && values.Profile_Heading != null && values.Profile_Heading != ""
            && values.Profile_Description != null && values.Profile_Description != ""
            && values.ProjectID != null && values.ProjectID != ""

            && values.Whether_Profile_Image_Available != null && isBoolean(values.Whether_Profile_Image_Available)
            && values.Whether_Baground_Image_Available != null && isBoolean(values.Whether_Baground_Image_Available)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await AdminController.Update_Client_Testimonials(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Client_Testimonials = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_Client_Testimonials(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
module.exports = AdminMediator;
