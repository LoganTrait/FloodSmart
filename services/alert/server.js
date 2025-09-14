const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Sensor = require('./models/sensor');

// connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => console.log('Alert service connected to MongoDB'))
.catch(err => console.error('Alert MongoDB error:', err));

// connect to MQTT broker
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log("Alert Service connected to MQTT broker");
    client.subscribe("/floodsmart/#");
});

// on sensor update, check thresholds and send alert if needed
client.on('message', async (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        let alert = null;

        if (data.type === "rainfall" && data.rainfall > 15) {
            alert = `High Rainfall at ${data.location}: ${data.rainfall}mm`;
        }
        if (data.type === "waterlevel" && data.waterLevel > 150) {
            alert = `High Water Level at ${data.location}: ${data.waterLevel}cm`;
        }

        if (alert) {
            console.log(alert);
            // save sensor data with alert attached
            const alertData = new Sensor({ ...data, alert: alert });
            await alertData.save();
        }
    } catch (err) {
        console.error("Error with message:", err);
    }
});