const testDB = require('./helpers/TestDB')
const expect = require('chai').expect
const Ins = require('./helpers/InsertHelper')
const Helper = require('../admin/helper') // includes unit under test

describe('admin/helper.adminResetFeatures', function () {
  let knex;

  before(async function () {
    knex = await testDB.reset(false, "EmptyTestDB")
    Ins.setKnex(knex)
    await Ins.insertFeature(1, "Feature1")
    await Ins.insertFeature(2, "Feature2")
    await Ins.insertFloor(1)
    await Ins.insertWorkspace("W1", 1)
    await Ins.insertWorkspaceFeature("W1", 1)
  })

  it('deletes all features', async function () {
    const floors = await OfficeBookingService.getFloors({ floorId: undefined, location: undefined }, knex)
    expect(floors).to.have.length(3)
  })

  it('returns only the CITY1 floors if location=CITY1', async function () {
    const floors = await OfficeBookingService.getFloors({ floorId: undefined, location: 'CITY1' }, knex)
    expect(floors).to.have.length(2)
    for (const f of floors) {
      expect(f.city).to.equal('CITY1')
    }
  })

  it('returns only the floorId=1 floor if id is specified', async function () {
    const floors = await OfficeBookingService.getFloors({ floorId: 1, location: undefined }, knex)
    expect(floors).to.have.length(1)
    const f = floors[0]
    expect(f.floorId).to.equal(1)
  })
})