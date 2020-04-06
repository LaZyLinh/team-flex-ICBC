'use strict';

const VERSION = "5:22PM fix unlockbooking"

const config = require('./config')
const authenticator = require('./auth/authenticator')
const admin = require('./admin/adminApp')
const auth = require('./auth/auth')
const fileUpload = require('express-fileupload')
const express = require('express')
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const featuremap = require('./controllers/FeatureMap');

const httpsOptions = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};
const oas3Tools = require('./oas3-tools-no-logging/dist');

// get Azure AD publc key
authenticator.getAndStoreMSADKey()

// swaggerRouter configuration
const options = {
  controllers: path.join(__dirname, './controllers')
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

app.use(cors())

// To test if the right AWS version is deployed
app.get('/version', function (req, res) {
  res.send(VERSION);
})

app.use(fileUpload());
app.get('/featuremap', featuremap);

// Overrides:
app.use(express.static("public"));
app.use('/admin', admin);
app.use('/auth', auth);


// Initialize the Swagger middleware

const serverPort = config.URL_PORT

// this is old http server start script
// http.createServer(app).listen(serverPort, function () {
//   console.log('Flex Work Back End is listening on port %d (https://localhost:%d)', serverPort, serverPort);
//   console.log('API Doc is available on https://localhost:%d/docs', serverPort);
// });

https.createServer(httpsOptions, app).listen(serverPort, function () {
  console.log('Flex Work Back End is listening on port %d (https://localhost:%d)', serverPort, serverPort);
  console.log('API Doc is available on https://localhost:%d/docs', serverPort);
});