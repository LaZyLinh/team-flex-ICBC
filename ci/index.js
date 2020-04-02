const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

let currentStatus = "Standby"
let echo = ""

app.get('/status', function (req, res) {
  res.send(currentStatus);
})

app.get('/echo', function (req, res) {
  res.send(echo)
})

app.post('/ci', function (req, res) {

  echo = JSON.stringify(req.body)
  res.sendStatus(200)
})

app.listen(8081, () => console.log("Live"))