// water_level_sensor.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

// topic
const topic = "/floodsmart/waterlevel";

// riverbank 1 location
const location = "Riverbank_1";

// connect to MQTT broker
client.on('connect', () => {
    console.log('Water level sensor connected to MQTT broker');

    // every 5 seconds generate and publish water level data
    setInterval(() => {
        // current timestamp
        const timestamp = new Date().toISOString();

        // 50-200cm water level
        const waterLevel = (50 + Math.random() * 150).toFixed(2);

        // message
        const message = JSON.stringify({
            location,
            timestamp,
            waterLevel: parseFloat(waterLevel),
            type: "waterlevel"
        });

        // publish
        client.publish(topic, message);
        console.log(`Published to ${topic}: ${message}`);
    }, 5000); 
});