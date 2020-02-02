const express = require('express');
const router = express.Router();

/* GET API status. */
router.get('/status', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
