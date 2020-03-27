function isNotInOldFeatures(lowercaseFeatureName, rows) {
  for (const { FeatureName } of rows) {
    if (lowercaseFeatureName === FeatureName.toLowerCase()) {
      return false
    }
  }
  return true
}

/**
   * Resets all features to those only in featureList

   * featureList array of strings (feature names)
   **/
async function adminResetFeatures(featureList, _knex = knex) {
  const query = `SELECT * from feature`
  const rows = (await _knex.raw(query))[0]; // old features
  const featureListLower = featureList.map(fn => fn.toLowerCase())
  const featuresToDelete = rows.filter(f => !featureListLower.includes(f.FeatureName.toLowerCase()))
  for (const { FeatureId } of featuresToDelete) {
    console.log
    const deleteWorkspaceFeatureQuery = `DELETE FROM workspacefeature WHERE FeatureId=${FeatureId}`
    await _knex.raw(deleteWorkspaceFeatureQuery)
    const deleteFeatureQuery = `DELETE FROM feature WHERE FeatureId=${FeatureId}`
    await _knex.raw(deleteFeatureQuery)
  }
  const featuresToAdd = featureListLower.filter(fn => isNotInOldFeatures(fn, rows));

  // insert new features
  for (const feature of featuresToAdd) {
    const addFeatureQuery = `INSERT INTO feature (FeatureName) VALUES ('${feature}')`
    await _knex.raw(addFeatureQuery)
  }
}

module.exports.adminResetFeatures = adminResetFeatures