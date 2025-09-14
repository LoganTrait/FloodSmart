const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    location: String,
    timestamp: Date,
    rainfall: Number,
    waterLevel: Number,
    type: String,
    alert: String
});

module.exports = mongoose.model('Alert', sensorSchema);