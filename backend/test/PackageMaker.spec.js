const testDB = require('./helpers/TestDB')
const { makePackages } = require('../services/PackageMaker')
const expect = require('chai').expect
const Ins = require('./helpers/InsertHelper')

describe('makePackages, complete overlap (no need to make package)', function () {
  let knex;

  before(async function () {
    knex = await testDB.reset(false, "EmptyTestDB")
    Ins.setKnex(knex)
    await Ins.insertUser(1, "test1.123", "test1.icbc.com")
    await Ins.insertFeature(1, "TV")
    await Ins.insertFeature(2, "Private")
    await Ins.insertFloor(1, 1)
    await Ins.insertFloor(2, 2)
    await Ins.insertWorkspace("TEST1", 1, 1)
  })

  it('returns empty array if there are no availabilities in the system', async function () {
    const packages = await makePackages({ startDate: '2020-05-01', endDate: '2020-05-10', desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(0)
  })

  it('returns empty array if there is an availability in the system but it\'s fully booked', async function () {
    await Ins.insertAvailability(1, "2020-04-01", "2020-04-08", "TEST1", "test-comment")
    await Ins.insertBooking(1, "2020-04-01", "2020-04-08", 1, 1, "TEST1")
    const packages = await makePackages({ startDate: "2020-04-02", endDate: "2020-04-07", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(0)
  })

  it('returns a package correctly if there is a completely open availability with exact same range', async function () {
    await Ins.insertAvailability(2, "2020-06-01", "2020-06-03", "TEST1", "test-comment-123")
    const packages = await makePackages({ startDate: "2020-06-01", endDate: "2020-06-03", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
    const bookingSuggestion = packages[0][0]
    // console.log(bookingSuggestion)
    expect(bookingSuggestion.availabilityId).to.equal(2)
    expect(bookingSuggestion.startDate).to.equal("2020-06-01")
    expect(bookingSuggestion.endDate).to.equal("2020-06-03")
    expect(bookingSuggestion.workspaceId).to.equal("TEST1")
    expect(bookingSuggestion.comment).to.equal("test-comment-123")
  })

  it('returns a package correctly if there is a completely open availability with subset date range', async function () {
    await Ins.insertAvailability(3, "2020-06-05", "2020-06-09", "TEST1", "test-comment-123")
    const packages = await makePackages({ startDate: "2020-06-06", endDate: "2020-06-07", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
    const bookingSuggestion = packages[0][0]
    expect(bookingSuggestion.availabilityId).to.equal(3)
    expect(bookingSuggestion.startDate).to.equal("2020-06-06")
    expect(bookingSuggestion.endDate).to.equal("2020-06-07")
    expect(bookingSuggestion.workspaceId).to.equal("TEST1")
    expect(bookingSuggestion.comment).to.equal("test-comment-123")
  })

  it('returns no packages if requesting a feature that the open workspace doesnt have', async function () {
    await Ins.insertAvailability(4, "2020-06-10", "2020-06-10", "TEST1", "test-comment-123")
    const packages = await makePackages({ startDate: "2020-06-10", endDate: "2020-06-10", desiredFloors: [], requiredFeatures: [1] }, knex)
    expect(packages).to.have.length(0)
  })

  it('returns a package correctly if requesting a feature that an open workspace does have', async function () {
    const workspaceId = "blablaTV"
    const comment = "Hello this is a test comment"
    const startDate = "2020-06-10"
    const endDate = "2020-06-10"
    const availabilityId = 5
    await Ins.insertWorkspace(workspaceId, 1, 1)
    await Ins.insertWorkspaceFeature(workspaceId, 1)
    await Ins.insertAvailability(availabilityId, startDate, endDate, workspaceId, comment)
    const packages = await makePackages({ startDate, endDate, desiredFloors: [], requiredFeatures: [1] }, knex)
    expect(packages).to.have.length(1)
    const bookingSuggestion = packages[0][0]
    expect(bookingSuggestion.availabilityId).to.equal(availabilityId)
    expect(bookingSuggestion.startDate).to.equal(startDate)
    expect(bookingSuggestion.endDate).to.equal(endDate)
    expect(bookingSuggestion.workspaceId).to.equal(workspaceId)
    expect(bookingSuggestion.comment).to.equal(comment)
  })

  it('returns no packages if requesting a floor that has a workspace without an availability', async function () {
    await Ins.insertWorkspace("w2", 2, 1)
    const packages = await makePackages({ startDate: "2020-06-10", endDate: "2020-06-10", desiredFloors: [2], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(0)
  })

  it('returns a package correctly if requesting a floor that an open workspace with an availability', async function () {
    const workspaceId = "w3"
    const comment = "a test comment"
    const startDate = "2020-06-10"
    const endDate = "2020-06-14"
    const reqStartDate = "2020-06-12"
    const reqEndDate = "2020-06-13"
    const availabilityId = 6
    await Ins.insertWorkspace(workspaceId, 2, 1)
    await Ins.insertAvailability(availabilityId, startDate, endDate, workspaceId, comment)
    const packages = await makePackages({ startDate: reqStartDate, endDate: reqEndDate, desiredFloors: [2], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
    const bookingSuggestion = packages[0][0]
    expect(bookingSuggestion.availabilityId).to.equal(availabilityId)
    expect(bookingSuggestion.startDate).to.equal(reqStartDate)
    expect(bookingSuggestion.endDate).to.equal(reqEndDate)
    expect(bookingSuggestion.workspaceId).to.equal(workspaceId)
    expect(bookingSuggestion.comment).to.equal(comment)
  })

  it('returns 2 packages correctly if requesting two floors that each have an open workspace', async function () {
    await Ins.insertFloor(3)
    await Ins.insertFloor(4)
    const workspaceId1 = "ws1.xx"
    const workspaceId2 = "ws2.xx"
    await Ins.insertWorkspace(workspaceId1, 3)
    await Ins.insertWorkspace(workspaceId2, 4)
    const startDate = "2020-06-10"
    const endDate = "2020-06-10"
    await Ins.insertAvailability(10, startDate, endDate, workspaceId1, "c1")
    await Ins.insertAvailability(11, startDate, endDate, workspaceId2, "c2")
    const packages = await makePackages({ startDate, endDate, desiredFloors: [3, 4], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(2)
  })

  it('returns 1 package correctly if requesting two floors that each have an open workspace, but only 1 has the right feature', async function () {
    const workspaceId1 = "ws1.xy"
    const workspaceId2 = "ws2.xy"
    await Ins.insertWorkspace(workspaceId1, 3)
    await Ins.insertWorkspace(workspaceId2, 4)
    await Ins.insertWorkspaceFeature(workspaceId1, 1)
    const startDate = "2020-06-10"
    const endDate = "2020-06-10"
    await Ins.insertAvailability(12, startDate, endDate, workspaceId1, "c1")
    await Ins.insertAvailability(13, startDate, endDate, workspaceId2, "c2")
    const packages = await makePackages({ startDate, endDate, desiredFloors: [3, 4], requiredFeatures: [1] }, knex)
    expect(packages).to.have.length(1)
    expect(packages[0][0].workspaceId).to.equal(workspaceId1)
  })

  it('returns a package correctly if there is a booking on the availability but there is no conflict', async function () {
    await Ins.insertWorkspace("abc", 1)
    await Ins.insertAvailability(14, "2020-09-01", "2020-09-05", "abc", "ccc")
    await Ins.insertBooking(20, "2020-09-02", "2020-09-03", 1, 14, "abc")
    const packages = await makePackages({ startDate: "2020-09-04", endDate: "2020-09-05", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
  })
})

describe('makePackages, from multiple availabilities', function () {
  let knex;

  before(async function () {
    knex = await testDB.reset(false, "EmptyTestDB")
    Ins.setKnex(knex)
    await Ins.insertUser(1, "test1.123", "test1.icbc.com")
    await Ins.insertFeature(1, "TV")
    await Ins.insertFeature(2, "Private")
    await Ins.insertFloor(1, 1)
    await Ins.insertFloor(2, 2)
    await Ins.insertWorkspace("TEST1", 1, 1)
  })

  after(function () {
    knex.destroy()
  })

  it('returns 1 package correctly from 2 availabilities with no bookings in them', async function () {
    await Ins.insertAvailability(1, "2020-04-01", "2020-04-03", "TEST1", "abc")
    await Ins.insertAvailability(2, "2020-04-04", "2020-04-06", "TEST1", "abc")
    const packages = await makePackages({ startDate: "2020-04-01", endDate: "2020-04-06", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
    const suggestion1 = packages[0][0]
    const suggestion2 = packages[0][1]
    expect(suggestion1.availabilityId).to.equal(1)
    expect(suggestion2.availabilityId).to.equal(2)
    expect(suggestion1.startDate).to.equal("2020-04-01")
    expect(suggestion1.endDate).to.equal("2020-04-03")
    expect(suggestion2.startDate).to.equal("2020-04-04")
    expect(suggestion2.endDate).to.equal("2020-04-06")
  })

  it('returns 1 package correctly from 2 availabilities with bookings in them', async function () {
    await Ins.insertAvailability(3, "2020-04-20", "2020-04-28", "TEST1", "abc")
    await Ins.insertAvailability(4, "2020-04-24", "2020-04-30", "TEST1", "abc")
    await Ins.insertBooking(1, "2020-04-20", "2020-04-20", 1, 3, "TEST1")
    await Ins.insertBooking(2, "2020-04-24", "2020-04-26", 1, 3, "TEST1")
    await Ins.insertBooking(3, "2020-04-27", "2020-04-28", 1, 4, "TEST1")

    // Package: availability 3: 21-23, then 4: 24-26, then 3: 27-28, then 4: 29-30
    const packages = await makePackages({ startDate: "2020-04-21", endDate: "2020-04-30", desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(1)
    const suggestion1 = packages[0][0]
    const suggestion2 = packages[0][1]
    const suggestion3 = packages[0][2]
    const suggestion4 = packages[0][3]
    expect(suggestion1.availabilityId).to.equal(3)
    expect(suggestion2.availabilityId).to.equal(4)
    expect(suggestion3.availabilityId).to.equal(3)
    expect(suggestion4.availabilityId).to.equal(4)
    expect(suggestion1.startDate).to.equal("2020-04-21")
    expect(suggestion1.endDate).to.equal("2020-04-23")
    expect(suggestion2.startDate).to.equal("2020-04-24")
    expect(suggestion2.endDate).to.equal("2020-04-26")
    expect(suggestion3.startDate).to.equal("2020-04-27")
    expect(suggestion3.endDate).to.equal("2020-04-28")
    expect(suggestion4.startDate).to.equal("2020-04-29")
    expect(suggestion4.endDate).to.equal("2020-04-30")
  })
})