/*
  Package:
  {
    startDate: "YYYY-MM-DD"
    endDate: "YYYY-MM-DD"
    // sorted by start date of suggested booking
    parts: [
      {
        availability: {
          availabilityId,
          user: {
          
          },
          workspace: {
          
          },
          features: [ "TV", "Private" ]
        },
        // dates of suggested booking
        startDate,
        endDate
      }
    ]
  }
*/

const FWC = require('flexwork-common')
const DBHelper = require('./DBHelper')

async function isNullOrEmptyArray(obj) {
    return obj == null || (Array.isArray(obj) && obj.length === 0);
}

function makeAvailability(id, startDate, endDate) {
    return { id, startDate, endDate, bookings: [] }
}

function makeBooking(id, startDate, endDate) {
    return { id, startDate, endDate }
}

function inflateAvailabilitiesWithBookings(rows) {
    const availabilities = {}
    for (const row of rows) {
        const aId = row.AvailabilityId;
        const availability = availabilities[aId]
        if (!availability) {
            newAvailability = makeAvailability(aId, row.AStartDate, row.AEndDate)
            availabilities[aId] = newAvailability
            const booking = makeBooking(row.BookingId, row.StartDate, row.EndDate)
            newAvailability.bookings.push(booking)
        } else {
            availability.bookings.push(booking)
        }
    }
    return availabilities
}

async function getAvailabilitiesCompleteOverlapWithBookings(startDate, endDate) {
    const query = `select * from
      (select a.AvailabilityId, a.StartDate as AStartDate, a.EndDate as AEndDate
      from availability a
      where a.StartDate <= '${startDate}' and a.EndDate >= '${endDate}') a
      left join booking b on a.AvailabilityId = b.BookingId`
    const rows = await knexHelper(queryWithBookings)
    return inflateAvailabilitiesWithBookings(rows)
}

function insertFeatureIntoAvailability(availability, featureName) {
    if (!availability.features) {
        availability.features = []
    }
    if (featureName) {
        availability.features.push(featureName)
    }
}

function insertUserIntoAvailability(availability, staffId, firstName, lastName, email) {
    if (!availability.user && staffId) {
        availability.user = { staffId, firstName, lastName, email }
    }
}

function insertWorkspaceIntoAvailability(availability, workspaceId, city, building) {
    if (!availability.workspace) {
        availability.workspace = { workspaceId, city, building }
    }
}

function addRemainingInformation(rows, availabilities) {
    for (const row of rows) {
        const id = row.AvailabilityId
        const a = availabilities[id]
        insertFeatureIntoAvailability(a, row.FeatureName)
        insertUserIntoAvailability(a, row.StaffId, row.FirstName, row.LastName, row.Email)
        insertWorkspaceIntoAvailability(a, row.WorkspaceId, row.City, row.Building)
    }
}

async function getAvailabilitiesFromDbCompleteOverlap(startDate, endDate) {
    const proms = []
    proms.push(getAvailabilitiesCompleteOverlapWithBookings(startDate, endDate));
    // Second query for the remaining information:
    const query =
        `select a.AvailabilityId, f.FeatureName, u.FirstName, u.LastName, u.Email, w.WorkspaceId, floor.FloorNo, 
    floor.City, floor.Building from
    (select a.AvailabilityId, a.WorkspaceId from availability a
    where a.StartDate <= '${startDate}' and a.EndDate >= '${endDate}') a
    natural join workspace w
    left join user u on u.StaffId = w.StaffId
    natural join floor
    left join workspacefeature wf on w.WorkspaceId = wf.WorkspaceId
    left join feature f on wf.FeatureId=f.FeatureId`
    proms.push(knexHelper(query))
    const results = await Promise.all(proms)
    // Once have both, build availabilities from both
    const availabilities = results[0] // availability map object with booking information
    const rows = results[1] // db rows with remaining information
    return addRemainingInformation(rows, availabilities)
}

function hasAllFeatures(availability, featureNames) {
    if (isNullOrEmptyArray(featureNames)) {
        return true
    }
    for (const featureName of featureNames) {
        if (!availability.features.includes(featureName)) {
            return false
        }
    }
    return true
}

async function getAvailabilitiesFromDb(startDate, endDate, featureNames, location, floor, ) {
    const availabilities = getAvailabilitiesFromDbCompleteOverlap(startDate, endDate)
    const filteredAvailabilities = []
    for (const availability of availabilities) {
        if (hasAllFeatures(availability, featureNames)) {
            availability.bookings.sort((b1, b2) => { b1.startDate - b2.startDate })
            if (FWC.canBook(availability, { startDate, endDate })) {
                filteredAvailabilities.push(availability)
            }
        }
    }
    return filteredAvailabilities
}

function makePackagesHelper(startDate, endDate, availabilities) {

}

async function makePackages(startDate, endDate, location, floor, featureNames) {
    if (!location) {
        const availabilities = await getAvailabilitiesFromDb(startDate, endDate, featureNames);
        const packages = availabilities.map(a => [a])
        return packages
    } else {
        const availabilities = await getAvailabilitesAnyOverlap(startDate, endDate, location, floor, featureNames);
        const packages = makePackagesHelper(startDate, endDate, availabilities)
        return packages
    }
}

module.exports = makePackages