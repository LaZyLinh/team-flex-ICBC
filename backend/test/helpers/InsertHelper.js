let knex

function setKnex(_knex) {
  knex = _knex
}

async function resetFeatureTables() {
  await knex.raw(`DROP TABLE workspacefeature`)
  await knex.raw(`DROP TABLE feature`)
  await knex.raw(`CREATE TABLE workspaceFeature(
    WorkspaceId varchar(10),
    FeatureId int,
    PRIMARY KEY(WorkspaceId, FeatureId)
  );`)
  await knex.raw(`CREATE TABLE feature(
    FeatureId int AUTO_INCREMENT PRIMARY KEY,
    FeatureName varchar(255) NOT NULL
  );`)
  await knex.raw(`ALTER TABLE workspacefeature ADD FOREIGN KEY (WorkspaceId) REFERENCES workspace (WorkspaceId);`)
  await knex.raw(`ALTER TABLE workspacefeature ADD FOREIGN KEY (FeatureId) REFERENCES feature (FeatureId);`)
}

async function insertFeature(featureId, featureName) {
  await knex.raw(`INSERT INTO feature VALUES (${featureId}, '${featureName}');`)
}

async function insertWorkspaceFeature(workspaceId, featureId) {
  await knex.raw(`INSERT INTO workspaceFeature VALUES ('${workspaceId}', ${featureId})`)
}

async function insertUser(staffId, icbcEmployeeId, email) {
  await knex.raw(`INSERT INTO user VALUES (${staffId}, '${icbcEmployeeId}', '${email}', 'test', 'test', 'test', 1);`)
}

async function insertFloor(floorId, floorNo = floorId, location = 'testLocation', city = 'testcity', building = 1) {
  await knex.raw(`INSERT INTO floor VALUES (${floorId}, ${floorNo}, '${location}', '${city}', '${building}', NULL);`)
}

async function insertWorkspace(workspaceId, floorId, staffId = 1) {
  await knex.raw(`INSERT INTO workspace VALUES ('${workspaceId}', 'test', ${staffId}, ${floorId});`)
}

async function insertAvailability(availabilityId, startDate, endDate, workspaceId, comment) {
  await knex.raw(`INSERT INTO availability VALUES (${availabilityId}, '${startDate}', '${endDate}', '${workspaceId}', '${comment}');`)
}

async function insertBooking(bookingId, startDate, endDate, staffId, availabilityId, workspaceId) {
  await knex.raw(`INSERT INTO booking (Confirmed, BookingId, StartDate, EndDate, StaffId, AvailabilityId, WorkspaceId) VALUES (1, ${bookingId}, '${startDate}', '${endDate}', ${staffId}, ${availabilityId}, '${workspaceId}');`)
}

module.exports = { setKnex, resetFeatureTables, insertFeature, insertWorkspaceFeature, insertUser, insertWorkspace, insertFloor, insertAvailability, insertBooking }