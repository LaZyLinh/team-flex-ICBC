const express = require('express');
const router = express.Router();
const User = require('./User')
const userDB = require('../db/user')
const workspaceDB = require('../db/workspace')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


require('dotenv').config();

router.get('/', (req, res) => {
  res.status(200);
  res.end('Hello World');
});


/*
 admin login
*/
router.post('/login', (req, res) => {
  let pass = req.body.password;

})

// Admin Add User
// /admin/user endpoint
// Mandatory body values: firstName, lastName, department, email
// Optional parameter: workspaceId (an employee who hasn’t been assigned a desk should still be able to book a desk)
// Response:  200 OK mark field Valid true in user table, return UserId
// 401 Unauthorized ​(missing, wrong, or expired security token) – Front end will show admin login screen in response
// 403 Forbidden: Conflicting email or desk already belongs to another user
router.post('/user', (req, res) => {
  let obj = {};
  let params = req.body;
  obj.FirstName = params.firstName;
  obj.LastName = params.lastName;
  obj.Department = params.department;
  obj.Email = params.email;
  obj.Valid = true;
  userDB.insertUser(obj).then(id => {
    if (id[0].StaffId) {
      if (params.workspaceId) {
        workspaceDB.assignUserToWorkspace(params.workspaceId, id[0].StaffId).then(() => {
          res.status(200);
          res.json({ StaffId: id[0].StaffId });
        });
      } else {
        res.status(200);
        res.json({ StaffId: id[0].StaffId });
      }

    } else {
      new Error("add user failed")
    }
  }).catch(err => {
    // new err;
    console.log(err);
    res.status(500);
    res.json({ message: err });
  })
})

module.exports = router;
