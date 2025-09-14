const express = require('express');
const mongoose = require('mongoose');
const Sensor = require('./models/sensor');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB error:', err));

// endpoint for NodeRED to save data to MongoDB
app.post('/api/sensor', async (req, res) => {
    try {
        const data = req.body;
        const newSensor = new Sensor(data);
        const saved = await newSensor.save();
        console.log("Saved:", saved);
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save sensor data" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sensor API on port ${PORT}`);
});