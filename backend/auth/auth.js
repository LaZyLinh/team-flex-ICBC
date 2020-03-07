const express = require('express');
const userDB = require("../db/user")
const router = express.Router();
const cookieParser = require("cookie-parser")
// router.use(cookieParser())

router.get("/user", (req, res) => {
  console.log('got here!');
  console.log(JSON.stringify(req.headers));
  console.log(req.params)
  res.json({ res: 200 })
})

module.exports = router;