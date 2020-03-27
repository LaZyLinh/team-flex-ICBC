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
  let cache = [];
  echo = JSON.stringify(circ, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Duplicate reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // Enable garbage collection
  currentStatus = "Someone hit up the /ci"
  res.sendStatus(200)
})

app.listen(8081, () => console.log("Live"))