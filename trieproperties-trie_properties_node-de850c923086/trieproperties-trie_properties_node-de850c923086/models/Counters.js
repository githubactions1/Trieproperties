const mongoose = require("mongoose");
const Counters = new mongoose.Schema({
    _id: { type: String, default: "" },
    seq: { type: Number, default: 0 }
}, { collection: 'Counters' });
module.exports = mongoose.model('Counters', Counters);