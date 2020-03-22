// Adds offices to the SQL string and returns the list of WorkspaceIds generated
function generate(sql, cities, numFeatures = 3, buildingsPerCity = 2, floorsPerBuilding = 5, workspacesPerFloor = 100, numEmployees = 5000) {
  const workspaces = []
  let staffId = 1
  let floorId = 1
  for (const city of cities) {
    for (let b = 1; b <= buildingsPerCity; ++b) {
      for (let f = 1; f <= floorsPerBuilding; ++f) {
        // Floor

        const FloorId = floorId++
        const FloorNo = f
        const Location = `'${city.name} Building ${b}'`
        const City = `'${city.name}'`
        const Building = `'${b}'`
        const FloorPlanUrl = `NULL`
        sql.script += `INSERT INTO floor(FloorId, FloorNo, Location, City, Building, FloorPlanUrl) VALUES (${FloorId}, ${FloorNo}, ${Location}, ${City}, ${Building}, ${FloorPlanUrl});\n`
        for (let w = 1; w <= workspacesPerFloor; ++w) {
          // Workspace
          const StaffId = staffId <= numEmployees ? staffId++ : `NULL`
          let leadingZeroesStr = '';
          if (w < 100) {
            leadingZeroesStr += '0';
          }
          if (w < 10) {
            leadingZeroesStr += '0';
          }
          const WorkspaceId = `'${b}${city.initials}${FloorNo}-${leadingZeroesStr}${w}'`
          const WorkspaceName = WorkspaceId
          sql.script += `INSERT INTO workspace(WorkspaceId, WorkspaceName, StaffId, FloorId) VALUES (${WorkspaceId}, ${WorkspaceName}, ${StaffId}, ${FloorId});\n`
          workspaces.push(WorkspaceId)
          // Features (arbitrary deterministic assigning of features)
          // Workspaces ending in 0 will have no features
          if (w % 10 === 0) {
            continue;
          }
          // Otherwise, a workspace has a feature iff w % featureId = 0
          for (let i = 1; i <= numFeatures; ++i) {
            if (w % i === 0) {
              sql.script += `INSERT INTO workspaceFature(WorkspaceId, FeatureId) VALUES (${WorkspaceId}, ${i});\n`
            }
          }
        }
      }
    }
  }
  return workspaces
}

module.exports = { generate }