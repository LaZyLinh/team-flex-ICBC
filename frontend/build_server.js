const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const fs = require('fs');
const httpsOptions = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};

const serverPort = 443;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

https.createServer(httpsOptions, app).listen(serverPort, function () {
  console.log('Flex Work front End is listening on port %d (https://localhost:%d)', serverPort, serverPort);
});