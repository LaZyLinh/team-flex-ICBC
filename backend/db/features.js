const knex = require('./mysqlDB');

module.exports = {
  insertFeature: function (featureName) {
    return knex('feature').insert({ FeatureName: featureName });
  },

  selectAllFeatureIds: async function () {
    const features = (await knex.raw(`select FeatureId from feature`))[0];
    var featuresString = JSON.stringify(features);
    var featuresJSON = JSON.parse(featuresString);

    let allFeatureIds = [];

    for (i = 0; i < featuresJSON.length; i++) {
      let feature = featuresJSON[i].FeatureId;
      allFeatureIds.push(feature);
    }

    return allFeatureIds;
  },

  deleteWorkspaceFeaturesByFeatureId: async function (featureIds) {
    let query = "delete from workspaceFeature where FeatureId in (" + featureIds + ");";
    return knex.raw(query);
  },

  clearAllFeatures: async function () {
    let allOldFeatureIds = await this.selectAllFeatureIds();
    let query = "delete from feature where FeatureId in (" + allOldFeatureIds + ");";
    return knex.raw(query);
  },
}