let DeviceMediator = function () { };

const CommonController = require("../controllers/CommonController");
const ApiMessages = require("../config/ApiMessages");
const DeviceController = require("../controllers/DeviceController");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;


DeviceMediator.Generate_DeviceID = async (req, res) => {
    try {
        let Result = await DeviceController.Generate_DeviceID(req.body);
        await CommonController.Common_Response_Handler(res, Result);
    } catch (error) {
        await CommonController.Common_Response_Handler(res, error);
    }
}

DeviceMediator.Splash_Screen = async (req, res) => {
    try {
        if (
            req.body.DeviceID != null && req.body.DeviceID != ''
            && req.body.DeviceType != null && isFinite(req.body.DeviceType)
            && req.body.DeviceName != null && req.body.DeviceName != ''
            && req.body.AppVersion != null && isFinite(req.body.AppVersion)
        ) {
            let ValidityStatus = await DeviceController.Splash_Screen_Validate_Device_Type(req.body);
            let IPAddress = await DeviceController.Common_IP_Address(req);
            let DeviceData = await DeviceController.Add_or_Update_Device_And_Get_Device_Information(req.body, IPAddress);
            let Result = await DeviceController.Validate_Splash_Screen_App_Versions_and_Send_Response(req.body, DeviceData);
            await CommonController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        if (!res.headersSent) {
            await CommonController.Common_Response_Handler(res, error);
        }
    }
}
DeviceMediator.Update_FCM_Token = async (req, res) => {
    try {
        if (
            req.body.ApiKey != null
            && req.body.FCM_Token != null && req.body.FCM_Token != ''
        ) {
            let DeviceData = await DeviceController.Check_for_Api_Key(req.body);
            let Result = await DeviceController.Update_FCM_Token(req.body, DeviceData);
            res.json(Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

module.exports = DeviceMediator;