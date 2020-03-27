const express = require('express')
const app = express()

let currentStatus = "Standby"
let echo = ""

app.get('/status', function (req, res) {
  res.send(currentStatus);
})

app.get('/echo', function (req, res) {
  res.send(echo)
})

app.post('/ci', function (req, res) {
  echo = req.toString()
  currentStatus = "Someone hit up the /ci"
  res.sendStatus(200)
})

app.listen(8081, () => console.log("Live"))