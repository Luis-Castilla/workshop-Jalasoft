'use strict';
/**Variables de entorno */
var env = require('node-env-file'); // .env file
env(__dirname + '/.env');

/**Servidor http */
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));

var routes = require('./src/routes/routes');
app.use('/', routes);

/** Inicio del puerto */
const port = process.env.PORT || 5000;
console.log(__dirname);
/** Inicio del server */
app.listen(port, () => console.log(`Server up and running on port ${port} !`));