const testDB = require('./helpers/TestDB')
const { makePackages } = require('../services/PackageMaker')
const expect = require('chai').expect

describe('makePackages', () => {
  it('returns empty array if there are no availabilities in the system', async () => {
    const knex = await testDB.reset(false, "EmptyTestDB")
    const packages = await makePackages({ startDate: '2020-04-01', endDate: '2020-04-05', desiredFloors: [], requiredFeatures: [] }, knex)
    expect(packages).to.have.length(0)
    knex.destroy()
  })
})