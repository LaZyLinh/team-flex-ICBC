let knex

function setKnex(_knex) {
  knex = _knex
}

async function insertFeature(featureId, featureName) {
  await knex.raw(`INSERT INTO feature VALUES (${featureId}, '${featureName}');`)
}

async function insertWorkspaceFeature(workspaceId, featureId) {
  await knex.raw(`INSERT INTO workspacefeature VALUES ('${workspaceId}', ${featureId})`)
}

async function insertUser(staffId, icbcEmployeeId, email) {
  await knex.raw(`INSERT INTO user VALUES (${staffId}, '${icbcEmployeeId}', '${email}', 'test', 'test', 'test', 1);`)
}

async function insertFloor(floorId, floorNo = floorId) {
  await knex.raw(`INSERT INTO floor VALUES (${floorId}, ${floorNo}, 'test', 'test', '1', NULL);`)
}

async function insertWorkspace(workspaceId, floorId, staffId = 1) {
  await knex.raw(`INSERT INTO workspace VALUES ('${workspaceId}', 'test', ${staffId}, ${floorId});`)
}

async function insertAvailability(availabilityId, startDate, endDate, workspaceId, comment) {
  await knex.raw(`INSERT INTO availability VALUES (${availabilityId}, '${startDate}', '${endDate}', '${workspaceId}', '${comment}');`)
}

async function insertBooking(bookingId, startDate, endDate, staffId, availabilityId, workspaceId) {
  await knex.raw(`INSERT INTO booking VALUES (1, ${bookingId}, '${startDate}', '${endDate}', ${staffId}, ${availabilityId}, '${workspaceId}');`)
}

module.exports = { setKnex, insertFeature, insertWorkspaceFeature, insertUser, insertWorkspace, insertFloor, insertAvailability, insertBooking }