'use strict';

const config = require('./config')
const authenticator = require('./auth/authenticator')
const admin = require('./admin/adminApp')
const auth = require('./auth/auth')
const fileUpload = require('express-fileupload')
const express = require('express')
const path = require('path');
const http = require('http');

const oas3Tools = require('oas3-tools');

// get Azure AD publc key
authenticator.getAndStoreMSADKey()

// swaggerRouter configuration
const options = {
  controllers: path.join(__dirname, './controllers')
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

app.use(fileUpload());

// Overrides:
app.use(express.static("public"));
app.use('/admin', admin);
app.use('/auth', auth);


// Initialize the Swagger middleware

const serverPort = config.URL_PORT

http.createServer(app).listen(serverPort, function () {
  console.log('Flex Work Back End is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('API Doc is available on http://localhost:%d/docs', serverPort);
});