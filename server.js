'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRouter = require("./routes/index")
const db = require('./config/db');
const i18n = require('./i18n')
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
// defining the Express app
const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true, optionsSuccessStatus: 200 }));
// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    switch (req.headers["x-language-key"]) {
        case 'en':
            break;
        case 'ar':
            break;
        case 'tr':
            break;
        default:
            req.headers["x-language-key"] = 'en'
            break;
    }
    next()
})
app.use("/api/", apiRouter);
// Default route
app.get("/", (req, res) => {
    res.end('Bakim Randevu! app is now running...');
})
// Run (Listen) app on port.
// app.listen(15356, () => {
//     console.log('App is running on post no. 15356');
// })
// const server = http.createServer((req, res) => {
//     console.log('Hey! This is your server response!');
// });
// server.listen(15356, function (req, res) {
//     console.log('App is running on post no. 15356');
// });

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(15357);
httpsServer.listen(15356);