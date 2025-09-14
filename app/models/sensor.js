// models/sensor.js
const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    location: { type: String },
    timestamp: { type: Date },
    rainfall: { type: Number },   // in mm
    waterLevel: { type: Number }, // in cm
    type: { type: String, enum: ['rainfall', 'waterlevel'] }
});

module.exports = mongoose.model('Sensor', sensorSchema);