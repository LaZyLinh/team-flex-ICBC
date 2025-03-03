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
const AdminFloorService = require("../services/AdminFloorService");
const Helper = require('./helper')
const Features = require('../db/features');
const floorDB = require("../db/floors");

const knex = require('../db/mysqlDB')
const knexHelper = async (query) => (await knex.raw(query))[0]

let lastAdminError = "No errors!";

require('dotenv').config();

router.get('/', (req, res) => {
  res.status(200);
  res.end('Hello World');
});


/*
 admin login
 ***** DEFAULT PASSWORD: bestteam *****
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

function handleErr(res, err) {
  if (err == null) {
    res.status(500).send("Literally null error... adminApp::handleErr was called with a null error")
  }
  lastAdminError = JSON.stringify(err, null, '    ');
  res.status(err.status || 500).json(err);
}

router.get('/last-error', (req, res) => {
  res.send(lastAdminError)
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

router.get('/locations2', async (req, res) => {
  try {
    const query = `SELECT Location, DateOfBirth, ID FROM location`
    const locations = await knexHelper(query)
    res.json(locations.map(row => { return { city: row.Location, dob: row.DateOfBirth, locationId: row.ID } }))
  } catch (err) {
    handleErr(res, err)
  }
})

function err(messageToClient) {
  return { error: messageToClient, status: 400 }
}

router.post('/locations2', async (req, res) => {
  try {
    const city = req.body.city;
    if (city == null) {
      throw err("city is missing")
    }
    await knexHelper(`INSERT INTO location (Location, DateOfBirth) VALUES ('${city}', '${new Date().toISOString().substr(0, 10)}')`)
    res.send("OK")
  } catch (err) {
    handleErr(res, err)
  }
})

router.get('/locations', async (req, res) => {
  try {
    const query = `SELECT Location FROM location`
    const locations = await knexHelper(query)
    res.json(locations.map(row => row.Location))
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  }
})

router.post('/locations', async (req, res) => {
  try {
    let name = req.body.locationName
    if (name == null || typeof name !== 'string' || name === '') {
      throw {
        error: `body must have locationName as non-empty string. name: ${name}, body: ${JSON.stringify(req.body)}`,
        status: 400
      }
    }
    name = name.trim()
    if (name === '') {
      throw {
        error: "unexpected error: location name must not be all whitespace. the front end should not have sent this request",
        status: 400
      }
    }
    const query = `SELECT Location FROM location`
    const locations = (await knexHelper(query)).map(row => row.Location)
    if (locations.includes(name)) {
      throw {
        error: "location name already exists",
        status: 400
      }
    }
    const insertQuery = `INSERT INTO location (Location) VALUES ('${name}')`
    await knexHelper(insertQuery)
    res.send("OK, done created")
  } catch (err) {
    const status = err.status || 500
    res.status(status)
    res.json(err)
  }
})

router.delete('/locations', async (req, res) => {
  try {
    let name = req.query.locationName.trim()
    const selectQuery = `SELECT * FROM location WHERE Location='${name}'`
    const rows = await knexHelper(selectQuery)
    if (rows.length === 0) {
      throw {
        error: "location name doesn't exist in location table",
        status: 400
      }
    }
    const deleteQuery = `DELETE FROM location WHERE Location='${name}'`
    await knexHelper(deleteQuery)
    res.send("OK, done deleted from the superficial location table, note that this doesn't delete any associated floors or workspaces!")
  } catch (err) {
    const status = err.status || 500
    res.status(status)
    res.json(err)
  }
})

/*
* admin get floors by city name
*/
router.get('/floors', (req, res) => {
  try {
    let city = req.query.city.trim();
    floorDB.getLocationByCity(city).then((obj) => {
      res.status(200);
      res.json(obj[0]);
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status)
    res.json(err)
  }
})

// w = raw SQLDB row
async function deleteWorkspaceHelper(w) {
  const selectAvailabilitiesQuery = `SELECT AvailabilityId FROM availability WHERE WorkspaceId='${w.WorkspaceId}'`
  const availabilitiesRaw = await knexHelper(selectAvailabilitiesQuery)
  for (const a of availabilitiesRaw) {
    const selectBookingsQuery = `SELECT BookingId FROM booking WHERE AvailabilityId=${a.AvailabilityId}`
    const bookingsRaw = await knexHelper(selectBookingsQuery)
    for (const b of bookingsRaw) {
      const deleteBookingQuery = `DELETE FROM booking WHERE BookingId=${b.BookingId}`
      await knexHelper(deleteBookingQuery)
    }
    const deleteAvailabilityQuery = `DELETE FROM availability WHERE AvailabilityId=${a.AvailabilityId}`
    await knexHelper(deleteAvailabilityQuery)
  }
  // delete workspacefeatures
  const deleteWFQuery = `DELETE FROM workspaceFeature WHERE WorkspaceId='${w.WorkspaceId}'`
  await knexHelper(deleteWFQuery)
  const deleteWorkspaceQuery = `DELETE FROM workspace WHERE WorkspaceId='${w.WorkspaceId}'`
  await knexHelper(deleteWorkspaceQuery)
}

async function adminDeleteFloor(floorId) {
  if (floorId == null) {
    throw {
      error: "need floorId",
      status: 400
    }
  }
  const selectQuery = `SELECT COUNT(*) FROM floor WHERE FloorId=${floorId}`
  const count = (await knexHelper(selectQuery))[0]["COUNT(*)"]
  if (count === 0) {
    throw {
      error: "floorId doesn't exist in database",
      status: 400
    }
  }
  try {
    const selectWorkspacesQuery = `SELECT WorkspaceId FROM workspace WHERE FloorId=${floorId}`
    const workspacesRaw = await knexHelper(selectWorkspacesQuery)
    for (const w of workspacesRaw) {
      await deleteWorkspaceHelper(w);
    }
    const deleteFloorQuery = `DELETE FROM floor WHERE FloorId=${floorId}`

    await knexHelper(deleteFloorQuery)
  } catch (e) {
    throw {
      error: "Could not delete... " + JSON.stringify(e),
      status: 400
    }
  }
}

async function adminEditFloor({ floorId, floorNo, building, city, location }) {
  if (!floorId) {
    throw {
      error: "missing floorId",
      status: 400
    }
  }
  if (floorNo == null && building == null && city == null && location == null) {
    throw {
      error: "none of { floorNo, building, city, location } are set",
      status: 400
    }
  }
  const floorNoUpdate = floorNo ? `FloorNo = ${floorNo}` : ""
  const buildingUpdate = (building && building !== "") ? `Building = '${building}'` : ""
  const cityUpdate = (city && city !== "") ? `City = '${city}'` : ""
  const locationUpdate = (location && location !== "") ? `Location = '${location}'` : ""
  const updateQuery = `UPDATE floor SET ${floorNoUpdate} ${buildingUpdate} ${cityUpdate} ${locationUpdate}
                       WHERE FloorId=${floorId}`
  await knexHelper(updateQuery)
}

async function adminCreateFloor({ floorNo, building, city, location }, floorPlanImg) {
  for (const item in [city, building]) {
    if (!item || typeof item !== 'string' || item.trim() === '') {
      throw {
        error: "City/building must not be null or empty string or all whitespace",
        status: 400
      }
    }
  }
  if (floorNo == null || floorNo.trim() === "") {
    throw {
      error: "Must have floor number",
      status: 400
    }
  }
  const selectQuery = `SELECT COUNT(*) FROM floor WHERE FloorNo=${floorNo} AND Building='${building}' AND City='${city}'`
  const count = (await knexHelper(selectQuery))[0]["COUNT(*)"]
  if (count > 0) {
    throw {
      error: "There is already an identical floor",
      status: 400
    }
  }
  const insertQuery = `INSERT INTO floor (FloorNo, Building, City, Location) VALUES (${floorNo}, '${building}', '${city}' ,'${location}')`
  const insertId = (await knexHelper(insertQuery)).insertId
  if (floorPlanImg) {
    const path = `./public/floorplans/${insertId}.jpg`;
    floorPlanImg.mv(path);
  }
  return insertId
}

router.post('/floors', async (req, res) => {
  try {
    console.log(req.body)
    const createdFloorId = await adminCreateFloor(req.body, req.files.floorPlanImg)
    res.json({ floorId: createdFloorId })
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
})

router.delete('/floors', async (req, res) => {
  try {
    const floorId = req.query.id;
    await adminDeleteFloor(floorId)
    res.status(200).send("OK")
  } catch (e) {
    res.status(err.status || 500).json(err);
  }
})

router.put('/floors', async (req, res) => {
  try {
    await adminEditFloor(req.body)
    res.status(200).send("OK")
  } catch (e) {
    res.status(err.status || 500).json(err);
  }
})

/*
 * Get all workspaces info with specific floorId
 * query example: http://localhost:8080/admin/workspaces?floorId=4
 * Response:  200 OK: join of Workspace-User-Floor
 * 401 Unauthorized ​(missing, wrong, or expired security token) – Front end will show admin login screen in response  
*/
router.get('/workspaces', (req, res) => {
  workspaceDB.getWorkspaceByFloorId(req.query.floorId).then(obj => {
    res.json(obj[0]);
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
  try {
    // check to see if workspace exists
    let workspace = await Workspaces.getByWorkspaceId(id);
    if (workspace[0].length === 0) {
      throw { message: "ID doesn't exist", status: 403 }
    }
    await deleteWorkspaceHelper({ WorkspaceId: id });
    return;
  } catch (e) {
    console.log(e.message)
    throw (e);
  }
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
    res.send(200);
  }).catch(err => {
    res.status(500);
    res.json({ message: err.toString() });
  })
})

async function getFeatureIdHelper(featureName) {
  const featureIdQuery = `SELECT FeatureId FROM feature WHERE FeatureName=${featureName}`;
  const rows = await knexHelper(featureIdQuery);
  if (rows.length === 0) {
    throw {
      error: `feature name: ${featureName} doesn't exist`,
      status: 400
    }
  }
  return rows[0].FeatureId
}

router.post('/workspacefeature/add', async (req, res) => {
  try {
    const workspaceId = req.body.workspaceId
    const featureName = req.body.featureName
    const featureId = await getFeatureIdHelper(featureName)
    const insertQuery = `INSERT IGNORE INTO workspaceFeature (WorkspaceId, FeatureId) VALUES ('${workspaceId}', ${featureId})`
    await knexHelper(insertQuery)
    res.send("OK")
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
})

router.post('/workspacefeature/delete', async (req, res) => {
  try {
    const workspaceId = req.body.workspaceId
    const featureName = req.body.featureName
    const featureId = await getFeatureIdHelper(featureName)
    const deleteQuery = `DELETE FROM workspaceFeature WHERE WorkspaceId = '${workspaceId}' AND FeatureID = ${featureId}`
    await knexHelper(deleteQuery)
    res.send("OK")
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
})

async function getStaffIdByEmail(email) {
  const query = `SELECT StaffId FROM user WHERE Email = '${email}'`
  const results = await knexHelper(query)
  if (results.length === 0) {
    throw {
      error: `No user exists in DB with email: ${email}`,
      status: 400
    }
  }
  return results[0].StaffId
}

async function updateWorkspaceHelper(workspaceId, staffId) {
  const query = `UPDATE workspace SET StaffId = ${staffId} WHERE WorkspaceId = '${workspaceId}'`
  await knexHelper(query)
}

async function adminUpdateWorkspace(id, email) {
  // check to see if workspace exists
  const rows = (await Workspaces.getByWorkspaceId(id))[0];
  if (rows.length === 0) {
    throw { message: "workspace doesn't exist", status: 403 }
  }
  const staffId = await getStaffIdByEmail(email)
  // update workspace with new information
  await updateWorkspaceHelper(id, staffId)
}

/*
 * Update workspace with specified id
 * query example: https://localhost:8080/admin/workspaces?id=NC1-02D
 * Body: email
 * Response:  200 OK
 *            400 doesn't exist
*/
router.put('/workspaces', (req, res) => {
  let params = req.body;
  adminUpdateWorkspace(req.query.id, params.email).then(() => {
    res.status(200);
    res.sendStatus(200);
  }).catch(err => {
    res.status(err.status || 500).json(err)
  })
})

/*
 * resets features to those only in featureList
 * query example: https://localhost:8080/admin/reset-features
 * Response:  200 OK
 * 401 Unauthorized ​ 
*/
router.post('/reset-features', (req, res) => {
  let params = req.body;
  let featureList = params.featureList.split(",").map(function (feature) {
    return feature.trim();
  });

  Helper.adminResetFeatures(featureList).then(() => {
    res.status(200);
    res.sendStatus(200);
  }).catch(err => {
    res.status(500);
    res.json({ message: err.toString() });
  })
})

router.post('/createfeature', async (req, res) => {
  try {
    if (req.body.featureName == null || req.body.featureName.trim() === '') {
      throw {
        error: "featureName is missing or empty string or all whitespace",
        status: 400,
      }
    }
    const featureName = req.body.featureName.trim();
    const countRaw = await knexHelper(`SELECT COUNT(*) FROM feature WHERE LOWER(FeatureName) = '${featureName.toLowerCase()}'`)
    const count = countRaw[0]["COUNT(*)"]
    if (count > 0) {
      throw {
        error: "This feature already exists",
        status: 400,
      }
    }
    const insertRaw = await knexHelper(`INSERT INTO feature (FeatureName) VALUES ('${featureName}')`)
    const featureId = insertRaw.insertId;
    res.json({ featureId })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
});

router.post('/deletefeature', async (req, res) => {
  try {
    if (req.body.featureId == null) {
      throw {
        error: "featureId missing",
        status: 400,
      }
    }
    await knexHelper(`DELETE FROM workspaceFeature WHERE FeatureId=${req.body.featureId}`)
    await knexHelper(`DELETE FROM feature WHERE FeatureId=${req.body.featureId}`)
    res.send("OK Deleted")
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
});

router.post("/upload-floorplan-image", AdminFloorService.uploadFloorPlan);
router.post("/upload-floor-data", AdminFloorService.uploadFloorData);

module.exports = router;
