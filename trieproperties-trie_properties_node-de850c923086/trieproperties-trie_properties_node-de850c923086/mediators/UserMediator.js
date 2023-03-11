let UserMediator = function () { };

const CommonController = require("../controllers/CommonController");
const ApiMessages = require("../config/ApiMessages");
const DeviceController = require("../controllers/DeviceController");
const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");
const ResponseController = require("../controllers/ResponseController");
const { Boolify } = require("node-boolify");
const isBoolean = require("node-boolify").isBoolean;

UserMediator.Filter_All_Blogs = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Filter_All_Blogs(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Fetch_Blog_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && values.BlogID != null
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Blog_Data = await CommonController.Check_Only_Blog(values);
            let Result = await UserController.Fetch_Blog_Complete_Information(values, Blog_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Filter_All_Projects = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Filter_All_Projects(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Fetch_Project_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && values.ProjectID != null
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await UserController.Fetch_Project_Complete_Information(values, Project_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


UserMediator.Submit_Contact_Form = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && values.Name != null && values.Name != ''
            && values.EmailID != null
            && values.Phone_Number != null
            && values.Message != null
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.Phone_Number);
            let Result = await UserController.Submit_Contact_Form(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
};

UserMediator.Submit_Book_A_Visit_Form = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && values.Name != null && values.Name != ''
            && values.EmailID != null
            && values.Phone_Number != null
            && values.ProjectID != null
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.Phone_Number);
            let Project_Data = await CommonController.Check_Only_Project(values);
            let Result = await UserController.Submit_Book_A_Visit_Form(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
};

UserMediator.Fetch_Contact_Us_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Fetch_Contact_Us_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Filter_All_Banners = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Filter_All_Banners(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Filter_All_Achievements_and_Rewards = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Filter_All_Achievements_and_Rewards(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Fetch_Achievements_and_Rewards_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && values.Achievements_and_RewardsID != null
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Achievement_Data = await CommonController.Check_Only_Achievements_and_Rewards(values);
            let Result = await UserController.Fetch_Achievements_and_Rewards_Complete_Information(values, Achievement_Data);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Fetch_Why_Work_Withus_Info = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Fetch_Why_Work_Withus_Info(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Fetch_Client_Testimonials = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Fetch_Client_Testimonials(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

UserMediator.Filter_All_Home_Project = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.ApiKey != null && values.ApiKey != ''
            && CommonController.isNumber(values.Skip)
            && CommonController.isNumber(values.Limit)
        ) {
            let DeviceData = await CommonController.Check_for_Api_Key(values);
            let Result = await UserController.Filter_All_Home_Project(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
module.exports = UserMediator;

