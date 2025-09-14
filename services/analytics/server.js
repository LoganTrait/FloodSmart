const express = require('express');
const mongoose = require('mongoose');
const Sensor = require('./models/sensor');

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => console.log('Analytics service connected to MongoDB'))
.catch(err => console.error('Analytics MongoDB error:', err));

// Calculate average rainfall and water level
app.get('/api/analytics/averages', async (req, res) => {
    const avgRain = await Sensor.aggregate([
        { $match: { type: "rainfall" } },
        { $group: { _id: null, avgRainfall: { $avg: "$rainfall" } } }
    ]);
    const avgWater = await Sensor.aggregate([
        { $match: { type: "waterlevel" } },
        { $group: { _id: null, avgWaterLevel: { $avg: "$waterLevel" } } }
    ]);
    res.json({ avgRain, avgWater });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Analytics service on port ${PORT}`);
});