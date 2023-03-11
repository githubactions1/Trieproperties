const mongoose = require("mongoose");
const App_Versions_Settings = mongoose.Schema({
    Application_Android_Version: { type: Number, default: 1 },
    Application_IOS_Version: { type: Number, default: 1 },
}, { collection: "App_Versions_Settings" });
module.exports = mongoose.model('App_Versions_Settings', App_Versions_Settings);