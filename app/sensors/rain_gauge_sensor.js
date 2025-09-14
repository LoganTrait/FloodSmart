// rain_gauge_sensor.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

// topic
const topic = "/floodsmart/rainfall";

// station 1 location
const location = "Station_1";

// connect to MQTT broker
client.on('connect', () => {
    console.log('Rainfall sensor connected to MQTT broker');

    // every 5 seconds generate and publish rainfall data
    setInterval(() => {
        // current timestamp
        const timestamp = new Date().toISOString();

        // 0-20mm rainfall
        const rainfall = (Math.random() * 20).toFixed(2);

        // message
        const message = JSON.stringify({
            location,
            timestamp,
            rainfall: parseFloat(rainfall),
            type: "rainfall"
        });

        // publish
        client.publish(topic, message);
        console.log(`Published to ${topic}: ${message}`);
    }, 5000); 
});