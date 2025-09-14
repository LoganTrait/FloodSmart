Run npm i in FloodSmart directory to install dependencies

.env should have MONGO_CONNECTION variable for MongoDB connection

Run NodeRed with ' node-red ' in terminal and import NodeRED/flow.json

To run the server in app, command 'node server.js', then command 'node rain_gauge_sensor' (or water level) for sensor data to be generated.
It should appear in terminal, NodeRED debug and in MongoDB. 

Early version of microservices have been implemented, no integration yet and dashboard page is not implemented. 

For docker containers, run:
'docker-compose build'
then
'docker-compose up'
in terminal in FloodSmart folder. 