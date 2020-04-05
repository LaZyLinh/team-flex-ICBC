// Mini controller for getting feature IDs for packages GET
const knex = require("../db/mysqlDB");

module.exports = async (req, res) => {
  const featureRows = (await knex.raw(`SELECT * FROM feature`))[0];
  const map = {}
  for (const row of featureRows) {
    map[row.FeatureName] = row.FeatureId;
  }
  res.json(map);
}