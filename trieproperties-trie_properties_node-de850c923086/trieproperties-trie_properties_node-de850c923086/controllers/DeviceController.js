let DeviceController = function () { };


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

//models
const Admins = require("../models/Admins");
const Devices = require("../models/Devices");
const App_Versions_Settings = require("../models/App_Versions_Settings");

DeviceController.Generate_DeviceID = () => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let Data = {
                    DeviceID: uuid.v4()
                }
                resolve({ success: true, extras: { Data: Data } });
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Check_for_Api_Key = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let query = {
                    ApiKey: values.ApiKey
                };
                let Result = await Devices.findOne(query).lean();
                if (Result == null) {
                    reject({ success: false, extras: { msg: ApiMessages.INVALID_API_KEY } })
                } else {
                    resolve(Result);
                };
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Splash_Screen_Validate_Device_Type = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let DeviceType = parseInt(values.DeviceType) || 1;
                if (DeviceType == 1 || DeviceType == 2 || DeviceType == 3) {
                    resolve("Validated Successfully");
                } else {
                    reject({ success: false, extras: { code: 2, msg: ApiMessages.INVALID_DEVICE } })
                }
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Common_IP_Address = (req) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let IPAddress = req.headers["x-forwarded-for"];
                if (IPAddress) {
                    let list = IPAddress.split(",");
                    IPAddress = list[list.length - 1];
                } else {
                    IPAddress = req.connection.remoteAddress;
                }
                IPAddress = (IPAddress == '::1') ? '0:0:0:0' : IPAddress;
                resolve(IPAddress);
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Add_or_Update_Device_And_Get_Device_Information = (values, IPAddress) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let ApiKey = uuid.v4();
                let query = {
                    DeviceID: values.DeviceID
                };
                let Result = await Devices.findOne(query).lean();
                let DeviceType = parseInt(values.DeviceType) || 1;
                if (Result == null) {
                    //New Device
                    let Interval = parseInt(moment().utcOffset(330).format('kk'));
                    let Data = {
                        ApiKey: ApiKey,
                        DeviceID: values.DeviceID,
                        DeviceType: DeviceType,
                        DeviceName: values.DeviceName,
                        AppVersion: values.AppVersion,
                        IPAddress: IPAddress,
                        InstallTime: new Date(),
                        Interval: Interval,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                    let DeviceResult = await Devices(Data).save();
                    resolve(JSON.parse(JSON.stringify(DeviceResult)));
                } else {
                    //Existing Device
                    let changes = {
                        $set: {
                            ApiKey: ApiKey,
                            AppVersion: values.AppVersion,
                            IPAddress: IPAddress,
                            updated_at: new Date()
                        }
                    };
                    let UpdatedStatus = await Devices.updateOne(query, changes).lean();
                    Result.ApiKey = ApiKey;
                    Result.AppVersion = values.AppVersion;
                    Result.IPAddress = IPAddress;
                    resolve(Result);
                };
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Update_FCM_Token = (values, DeviceData) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let query = {
                    DeviceID: DeviceData.DeviceID
                };
                let changes = {
                    $set: {
                        FCM_Token: values.FCM_Token,
                        updated_at: new Date()
                    }
                };
                let UpdatedStatus = await Devices.updateOne(query, changes).lean();
                resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Validate_Splash_Screen_App_Versions_and_Send_Response = (values, DeviceData) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let DeviceType = parseInt(values.DeviceType) || 1;
                let AppVersion = parseFloat(values.AppVersion) || 1;
                let VersionData = await DeviceController.Common_Register_or_Get_App_versions();
                let CheckingVersion = (DeviceType == 1) ? VersionData.Android_Version : VersionData.IOS_Version;
                let Whether_Latest_Version = (AppVersion >= CheckingVersion) ? true : false;
                resolve({ success: true, extras: { Status: "Device Splash Screen Completed Successfully", Env_Type: config.Env_Type, ApiKey: DeviceData.ApiKey, Whether_Latest_Version: Whether_Latest_Version } });
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}

DeviceController.Common_Register_or_Get_App_versions = () => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let Result = await App_Versions_Settings.findOne().lean();
                if (Result == null) {
                    let VersionData = await App_Versions_Settings().save();
                    resolve(JSON.parse(JSON.stringify(VersionData)));
                } else {
                    resolve(Result);
                };
            } catch (error) {
                reject(await CommonController.Common_Error_Handler(error));
            }
        });
    });
}


module.exports = DeviceController;