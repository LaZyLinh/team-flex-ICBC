const express = require('express');
const router = express.Router();
const Validation = require('./validation');
const adminValidate = new Validation();
const userDB = require('../db/user')
const workspaceDB = require('../db/workspace')
const auth = require('./adminAuth');

const Workspaces = require('../db/workspace');
const Bookings = require('../db/bookings');
const Availabilities = require('../db/availabilities');
const OfficeLendingService = require('../services/OfficeLendingService');
const OfficeBookingService = require('../services/OfficeBookingService');
const Service = require('../services/Service');

require('dotenv').config();

router.get('/', (req, res) => {
  res.status(200);
  res.end('Hello World');
});


/*
 admin login
 default password: bestteam
 Response:  200 OK, with ​token. The token will be included in the header of every admin request.
                format: header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiZXhwIjoxNTg5NTAyMDA0LCJpYXQiOjE1ODQzMTgwMDR9.PyJvSoQzOtjkKknE0FqrARp2_hsD06aoGzo98uM5WWc'
            403 Forbidden: wrong pass

*/
router.post('/login', async (req, res, next) => {
  let pass = req.body.password;

  try {
    // adminValidate.setPassword(pass);
    let result = await adminValidate.validatePassword(pass);
    if (result) {
      const token = adminValidate.generateJWT();
      res.json({ message: 'success', token: token });
    } else {
      res.status(403).send({ message: "invalid password" })
    }
  } catch (err) {
    console.log(err);
    res.status(500)
    res.json({ message: err })
  }
})

// all endpoint below here requires admin login token
router.use(auth.required)

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
    res.json({ message: err.toString() });
  })
})

/*
 * Get all workspaces info with specific floorId
 * query example: http://localhost:8080/admin/workspaces?floorId=4
 * Response:  200 OK: join of Workspace-User-Floor
 * 401 Unauthorized ​(missing, wrong, or expired security token) – Front end will show admin login screen in response  
*/
router.get('/workspaces', (req, res) => {
  workspaceDB.getWorkspaceByFloorId(req.query.floorId).then(obj => {
    res.status(200);
  }).catch(err => {
    res.status(500);
    res.json({ message: err.toString() })
  })
})

/**
   * Deletes a Workspace and its related availabilities and bookings
   *
   * id Integer ID of the Workspace to delete
   **/
async function adminDeleteWorkspace(id) {
  return new Promise(
    async (resolve) => {
      try {
        // check to see if workspace exists
        let workspace = await Workspaces.getByWorkspaceId(id);
        console.log('workspace');
        console.log(workspace[0]);
        if (workspace[0].length === 0) {
          console.log('workspace length is 0');
          throw { message: "ID doesn't exist", status: 403 }
        }

        // query all availabilities related to this workspace
        let availabilities = await Availabilities.getByWorkspaceId(id);
        for (const availability of availabilities[0]) {
          console.log('availability #');
          console.log(availability.AvailabilityId);
          await OfficeLendingService.cancelAvailability(availability.AvailabilityId);
        }

        // query all bookings related to this workspace
        let bookings = await Bookings.getByWorkspaceId(id);
        for (const booking of bookings[0]) {
          console.log('booking #');
          console.log(booking.BookingId);
          await OfficeBookingService.cancelBooking(booking.BookingId);
        }

        await Workspaces.deleteWorkspace(id);
        resolve('200');
      } catch (e) {
        resolve(Service.rejectResponse(
          e.message || 'Invalid input',
          e.status || 401,
        ));
      }
    },
  );
}

/*
 * Delete workspace with specified id
 * query example: http://localhost:8080/admin/deleteWorkspace?id=NC1-02D
 * Response:  200 OK
 * 401 Unauthorized ​(missing, wrong, or expired security token) – Front end will show admin login screen in response  
 * 403 Forbidden (workspace doesn’t exist)
*/
router.delete('/deleteWorkspace', (req, res) => {
  adminDeleteWorkspace(req.query.id).then(() => {
    res.status(200);
    //res.json(obj[0]);
  }).catch(err => {
    res.status(500);
    res.json({ message: err.toString() });
  })
})

module.exports = router;
