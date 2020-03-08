const express = require('express');
const userDB = require("../db/user")
const router = express.Router();
const cookieParser = require("cookie-parser")
// router.use(cookieParser())


/* 
 *  /auth/user endpoint
 *  Manatory body value: email
 *  Optional body value: firstName, lastName
 *  return: stuffId
 *  find user by email
 *  if no email found, create new user.
 */
router.post("/user", (req, res) => {
  let email = req.body.email;
  userDB.findUserByEmail(email).then(obj => {
    if (obj[0]) {
      let sid = obj[0].StaffId;
      res.status(200);
      res.json({ StaffId: sid })
    } else {
      // No user found with that email, create a new one.
      const insertObj = req.body;
      userDB.insertUser(insertObj).then(id => {
        if (id[0]) {
          res.status(200);
          res.json({ StaffId: id[0].StaffId });
        } else {
          throw new Error("User insert failed!");
        }
      }).catch(err => {
        res.status(500);
        res.json({ message: err });
      })
    }
  }).catch(error => {
    res.status(500);
    res.json({ message: error });
  })

})

module.exports = router;