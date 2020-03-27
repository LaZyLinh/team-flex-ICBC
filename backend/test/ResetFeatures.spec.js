const testDB = require('./helpers/TestDB')
const expect = require('chai').expect
const Ins = require('./helpers/InsertHelper')
const Helper = require('../admin/helper') // includes unit under test

describe('admin/helper.adminResetFeatures', function () {
  let knex;

  before(async function () {
    knex = await testDB.reset(false, "TestDBResetFeatures")
    Ins.setKnex(knex)
    await Ins.insertFeature(1, "Feature1")
    await Ins.insertFeature(2, "Feature2")
    await Ins.insertFloor(1)
    await Ins.insertUser(1, "testuser1234", "testuser@icbc.com")
    await Ins.insertWorkspace("W1", 1, 1)
    await Ins.insertWorkspaceFeature("W1", 1)
  })


  it('no intersection with old features', async function () {
    const features = ['Feature3', 'Feature4', 'Feature5']
    await Helper.adminResetFeatures(features, knex)
    const featuresQuery = `SELECT * from feature`
    const fRows = (await knex.raw(featuresQuery))[0]
    expect(fRows).to.have.length(3)
    const workspaceFeaturesQuery = `SELECT * from workspacefeature`
    const wfRows = (await knex.raw(workspaceFeaturesQuery))[0]
    expect(wfRows).to.have.length(0)
  })

  it('has exactly the old features', async function () {
    // Setup
    await Ins.resetFeatureTables()
    await Ins.insertFeature(1, "Feature1")
    await Ins.insertFeature(2, "Feature2")
    await Ins.insertWorkspaceFeature("W1", 1)

    const features = ['feature1', 'feature2']
    await Helper.adminResetFeatures(features, knex)
    const featuresQuery = `SELECT * from feature`
    const fRows = (await knex.raw(featuresQuery))[0]
    expect(fRows).to.have.length(2)
    const workspaceFeaturesQuery = `SELECT * from workspacefeature`
    const wfRows = (await knex.raw(workspaceFeaturesQuery))[0]
    expect(wfRows).to.have.length(1)
  })

  // Helper function: compares 2 arrays 1-level deep with object equality based on keys
  function setIdentity(actual, expected, keys = undefined) {
    if (!keys && expected.length > 0) {
      keys = Object.keys(expected[0])
    }

    if (!Array.isArray(actual)) {
      return "actual is not an array"
    }
    if (actual.length !== expected.length) {
      return "actual and expected sets have different lengths"
    }

    // Create expectation
    const map = {}
    for (const elem of expected) {
      const signature = {}
      for (const key of keys) {
        signature[key] = elem[key];
      }
      const str = JSON.stringify(signature);
      map[str] = 1
    }

    // See if actual meets expectation
    for (const elem of actual) {
      const signature = {}
      for (const key of keys) {
        signature[key] = elem[key];
      }
      const str = JSON.stringify(signature);
      if (!map[str]) {
        return "actual array has an item not in expected: " + JSON.stringify(elem);
      } else {
        map[str] = 2
      }
    }

    for (const key in map) {
      if (map[key] == 1) {
        return "expected array has an item not in actual: " + key;
      }
    }
    return true
  }

  it('has 1 old feature and 1 new feature', async function () {
    // Setup
    await Ins.resetFeatureTables()
    await Ins.insertFeature(1, "Feature1")
    await Ins.insertFeature(2, "Feature2")
    await Ins.insertWorkspaceFeature("W1", 1)

    const features = ['feature1', 'FeatureNew']
    await Helper.adminResetFeatures(features, knex)
    const featuresQuery = `SELECT * from feature`
    const rows = (await knex.raw(featuresQuery))[0]
    const expected = [{ FeatureId: 1, FeatureName: 'Feature1' }, { FeatureId: 3, FeatureName: 'FeatureNew' }]
    expect(setIdentity(rows, expected) === true)
  })

})