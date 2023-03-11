const mongoose = require("mongoose");
const Home_Projects = new mongoose.Schema({
    Home_ProjectID: { type: String, default: "" },
    ProjectID: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'Home_Projects', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Home_Projects', Home_Projects);