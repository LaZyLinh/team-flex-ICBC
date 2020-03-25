const express = require('express');
const userDB = require("../db/user")
const workspaceDB = require("../db/workspace");
const router = express.Router();
const cookieParser = require("cookie-parser")
// router.use(cookieParser())


/* 
 *  /auth/user endpoint
 *  Manatory body value: Email, FirstName, LastName
 *  Optional body value: Department
 *  return: code 200 & StuffId
 *  Error: code 500 with {message: error}
 *  find user by email
 *  if no email found, create new user.
 */
router.post("/user", (req, res) => {
  let email = req.body.Email;
  userDB.findUserByEmail(email).then(obj => {
    if (obj[0]) {
      let sid = obj[0].StaffId;
      workspaceDB.getWorkspaceByStaffId(sid).then(wsp => {
        if (wsp[0]) {
          let tmp = wsp[0];
          console.log(tmp[0].WorkspaceId)
          workspaceDB.getFeaturesByWorkspaceId(tmp[0].WorkspaceId).then(feas => {
            console.log(feas[0]);
            let rtemp = tmp[0];
            rtemp.features = feas[0];
            res.status(200);
            res.json(rtemp);
          })
        } else {
          res.status(200);
          res.json({ StaffId: sid })
        }
      })

    } else {
      // No user found with that email, create a new one.
      const insertObj = req.body;
      insertObj["Valid"] = true;
      userDB.insertUser(insertObj).then(id => {
        if (id[0]) {
          res.status(200);
          res.json({ StaffId: id[0].StaffId });
        } else {
          throw new Error("User insert failed!");
        }
      }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: err });
      })
    }
  }).catch(error => {
    console.error(error);
    res.status(500);
    res.json({ message: error });
  })

})

module.exports = router;