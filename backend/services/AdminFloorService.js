const csv = require("csvtojson");
const knex = require("../db/mysqlDB");

const FORM_ID_IMAGE_UPLOAD = "floorPlanImage";
const FORM_ID_CSV_UPLOAD = "floorData";
const MAX_UPLOAD_SIZE = 20971520; // 20 MB
const FLOORPLANS_PUBLIC_FOLDER = "floorplans";
const OFFICE_ID_COLUMN_NAME = "OfficeID";
const EMPLOYEE_ID_COLUMN_NAME = "EmployeeID";
const MANDATORY_COLUMN_NAMES = [OFFICE_ID_COLUMN_NAME, EMPLOYEE_ID_COLUMN_NAME];
const CONSIDERED_NO = ["", "no", "n", "false", "f", "-"];

/**
 * Helper function
 * @param {string} query 
 */
async function db(query) {
  return (await knex.raw(query))[0];
}

/**
 * Finds the value MySQL returned in response to "select exists" and checks if it's
 * 1 (yes) or not
 * @param {any} row the return of await db(query)
 */
function itDoesExist(row) {
  return Object.values(row[0])[0] === 1;
}

async function floorExists(floorId) {
  const query = `select exists (select * from floor where FloorId=${floorId})`;
  return itDoesExist(await db(query));
}

async function getFeaturesFromDatabase() {
  const query = `select FeatureId, FeatureName from feature`;
  const rows = await db(query);
  return rows.map(r => {
    return { id: r.FeatureId, name: r.FeatureName }
  });
}

async function getFloorNameFromDatabase(floorId) {
  const query = `select FloorName from floor where FloorId=${floorId}`;
  const row = await db(query);
  return row.FloorName;
}

function validateUploadRequest(req, formId) {
  const id = req.body.floorId;
  if (!floorExists(id)) {
    throw new Error(`Invalid floor ID: ${id}`);
  }
  if (req.files.length === 0) {
    throw new Error("No files uploaded at all");
  }
  const file = req.files[FORM_ID_IMAGE_UPLOAD];
  if (!file) {
    throw new Error(`No file found for form ID ${formId}`);
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error(`Max size is ${MAX_UPLOAD_SIZE} bytes but the file uploaded was ${file.size} bytes`)
  }
}

async function validateColumnNamesFromCSV(columnNames, featureNames) {
  // Check for mandatory columns
  for (const colName of MANDATORY_COLUMN_NAMES) {
    if (!columnNames.includes(colName)) {
      // Does not include a mandatory column name
      throw new Error(`Missing column name in CSV: ${colName}`);
    }
  }
  // Check for missing features
  for (const featureName of featureNames) {
    if (!columnNamesFromCSV.includes(featureName)) {
      throw new Error(`Missing information about feature: ${featureName}`);
    }
  }
}

/**
 * Searches the database for a user that has the given employeeId
 * If there is one, return its userId
 * If there isn't one, create it, then return its userId
 * 
 * @param {string} employeeId 
 */
async function getOrCreateUserId(employeeId) {
  const selectQuery = `select StaffId from user where EmployeeId = '${employeeId}')`;
  const selectResults = await db(selectQuery);
  let staffId;
  if (selectResults.length === 0) {
    // Create a new user
    const insertQuery = `insert into user(EmployeeId) values (${employeeId})`;
    const insertResults = await db(insertQuery);
    staffId = insertResults.insertId;
  } else {
    // Retrieve existing user's ID
    staffId = selectResults[0].StaffId;
  }
  return staffId;
}

async function insertIgnoreWorkspace(workspaceId, floorId, staffId) {
  const query =
    staffId ?
      `insert ignore into workspace(WorkspaceId, StaffId, FloorId) values ('${workspaceId}', ${staffId}, ${floorId})`
      : `insert ignore into workspace(WorkspaceId, FloorId) values ('${workspaceId}', ${floorId})`;
  await db(query);
}

function hasFeature(row, featureName) {
  const value = row[featureName].toLowerCase();
  return !CONSIDERED_NO.includes(value);
}

async function insertIgnoreWorkspaceFeature(workspaceId, featureId) {
  await db(`insert ignore into workspaceFeature(WorkspaceId, FeatureId) values ('${workspaceId}', ${featureId})`);
}

async function updateWorkspaceFeatures(row, workspaceId, featureMap, featureNames) {
  const proms = [];
  for (const featureName of featureNames) {
    if (hasFeature(row, featureName)) {
      proms.push(insertIgnoreWorkspaceFeature(workspaceId, featureMap[featureName]));
    }
  }
  await Promise.all(proms);
}

async function processCSVRow(row, { floorId, floorName }, featureMap, featureNames) {
  const officeId = row[OFFICE_ID_COLUMN_NAME];
  const employeeId = row[EMPLOYEE_ID_COLUMN_NAME];
  const workspaceId = floorName + "-" + officeId;
  if (employeeId !== "") {
    // There is an employee associated with this. Get the employee's userID.
    const userId = await getOrCreateUserId(employeeId);
    await insertIgnoreWorkspace(workspaceId, floorId, userId);
  } else {
    await insertIgnoreWorkspace(workspaceId, floorId);
  }
  await updateWorkspaceFeatures(row, workspaceId, featureMap, featureNames);
}

/**
 * @returns an object that maps name to featureId
 * @param {[{name: string, id: number}]} features 
 */
function makeFeatureMap(features) {
  const map = {};
  for (const { name, id } of features) {
    map[name] = id;
  }
  return map;
}

async function processFloorData(file, features, floor) {
  const str = file.data.toString('utf8');
  const featureNames = features.map(f => f.name);
  const parsedArray = await csv().fromString(str);
  if (!parsedArray || parsedArray.length === 0) {
    return false;
  }
  await validateColumnNamesFromCSV(columnNames, featureNames);

  const featureMap = makeFeatureMap(features);
  // Lots of trips to the database
  const proms = [];
  for (const row of parsedArray) {
    proms.push(processCSVRow(row, floor, featureMap, featureNames));
  }
  await Promise.all(proms);
}

async function uploadFloorData(req, res) {
  validateUploadRequest(req, FORM_ID_CSV_UPLOAD);
  const features = await getFeaturesFromDatabase();
  const floorId = req.body.floorId;
  const floorName = await getFloorNameFromDatabase(floorId);
  const file = req.file[FORM_ID_CSV_UPLOAD];
  await processFloorData(file, features, { floorId, floorName });
}

async function uploadFloorPlan(req, res) {
  validateUploadRequest(req, FORM_ID_IMAGE_UPLOAD);
  const floorId = req.body.floorId;
  const file = req.files[FORM_ID_IMAGE_UPLOAD];
  const path = `./public/${FLOORPLANS_PUBLIC_FOLDER}/${floorId}.jpg`;
  file.mv(path);
}

function controllerWrapper(f) {
  return async (req, res) => {
    try {
      await f(req, res);
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
};

module.exports = {
  uploadFloorPlan: controllerWrapper(uploadFloorPlan),
  uploadFloorData: controllerWrapper(uploadFloorData)
};