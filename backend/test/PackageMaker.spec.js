const testDB = require('./helpers/TestDB')
const { makePackages } = require('../services/PackageMaker')
const expect = require('chai').expect

describe('makePackages', () => {
  let knex;

  before(async () => {
    knex = await testDB.reset(false, "EmptyTestDB")
  })

  after(() => {
    knex.destroy()
  })

  it('returns empty array if there are no availabilities in the system', async () => {
    const packages = await makePackages({ startDate: '2020-04-01', endDate: '2020-04-05', desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(0)
  })

  it('returns empty array if there is an availability in the system but it\'s fully booked', async () => {
    // TODO
  })
})