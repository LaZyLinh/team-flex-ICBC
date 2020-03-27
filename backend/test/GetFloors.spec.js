const testDB = require('./helpers/TestDB')
const expect = require('chai').expect
const Ins = require('./helpers/InsertHelper')
const OfficeBookingService = require('../services/OfficeBookingService')

describe('OfficeBookingService.getFloors', function () {
  let knex;

  before(async function () {
    knex = await testDB.reset(false, "EmptyTestDB")
    Ins.setKnex(knex)
    await Ins.insertFloor(1, 1, "XYZ", "CITY1", 1);
    await Ins.insertFloor(2, 2, "XYZ", "CITY1", 1);
    await Ins.insertFloor(3, 1, "ABC", "CITY2", 1);
  })


  it('returns all the floors if empty params', async function () {
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