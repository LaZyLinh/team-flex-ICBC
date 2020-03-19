const knex = require('../db/mysqlDB')

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24

async function resultFromKnex(query) {
    return (await knex.raw(query))[0]
}

function isNonEmptyArray(x) {
    return Array.isArray(x) && x.length > 0
}

/**
 * Subquery for a list of valid AvailabilityId based on the criteria, from which to make packages
 */
function buildSubquery({ startDate, endDate, desiredFloors, requiredFeatures }) {
    // (1) Any date overlap:
    let query = `
    (SELECT a.AvailabilityId
    FROM availability a
    WHERE (StartDate BETWEEN '${startDate}' AND '${endDate}'
          OR EndDate BETWEEN '${startDate}' AND '${endDate}')
    `
    // (2) Desired floors:
    if (isNonEmptyArray(desiredFloors)) {
        query += `AND (`
        for (let i = 0; i < desiredFloors.length; ++i) {
            if (i > 0) {
                query += `
          OR `
            }
            query += `(a.AvailabilityId IN (SELECT AvailabilityId FROM workspace WHERE FloorId = ${desiredFloors[i]}))`
        }
        query += `)
    `
    }
    // (3) Required features:
    if (isNonEmptyArray(requiredFeatures)) {
        query += `AND (a.AvailabilityId IN (SELECT AvailabilityId FROM workspace WHERE `
        for (let i = 0; i < requiredFeatures.length; ++i) {
            if (i > 0) {
                query += `
                                                                     AND `
            }
            query += `WorkspaceId IN (SELECT WorkspaceId FROM workspacefeature WHERE FeatureId = ${requiredFeatures[i]})`
        }
        query += `))`
    }


    query += `)`
    return query
}

function makeAvailability(id, startDate, endDate, workspaceId, comment) {
    return { id, startDate, endDate, workspaceId, comment, bookings: [] }
}

/**
 * @returns map object (id -> availability) if any fall into conditions, null otherwise
 */
async function getAvailabilities(conditions) {
    const subquery = buildSubquery(conditions)
    // StartDate, EndDate, WorkspaceId, Comment
    const availabilitiesQuery = `SELECT * FROM availability WHERE AvailabilityId IN ` + subquery
    const availabilitiesRows = await resultFromKnex(availabilitiesQuery)
    if (availabilitiesRows.length === 0) {
        return null
    }
    // Get the current bookings on these availabilities
    const bookingsQuery = `SELECT a.AvailabilityId, b.StartDate, b.EndDate
                           FROM availability a
                           INNER JOIN booking b
                           WHERE a.AvailabilityId IN ` + subquery
    const bookingsRows = await resultFromKnex(bookingsQuery)
    const availabilities = {}
    for (const a of availabilitiesRows) {
        const id = a.AvailabilityId
        availabilities[id] = makeAvailability(id, a.StartDate, a.EndDate, a.WorkspaceId, a.Comment)
    }
    for (const b of bookingsRows) {
        const id = b.AvailabilityId
        if (!availabilities[id]) {
            // availability got added between the two queries -- restart
            return await getAvailabilities(conditions)
        }
        availabilities[id].bookings.push({ startDate: b.StartDate, endDate: b.EndDate });
    }
    return availabilities
}

/**
 * @param {string} x "YYYY-MM-DD"
 * @param {string} y "YYYY-MM-DD"
 */
function isBefore(x, y) {
    return Date.parse(x) < Date.parse(y)
}

/**
 * @param {string} start1 "YYYY-MM-DD"
 * @param {string} end1 "YYYY-MM-DD"
 * @param {string} start2 "YYYY-MM-DD"
 * @param {string} end2 "YYYY-MM-DD"
 */
function hasNoOverlap(start1, end1, start2, end2) {
    return isBefore(end1, start2) || isBefore(end2, start1)
}

function hasConflict(bookings, startDate, endDate) {
    for (const b of bookings) {
        if (!hasNoOverlap(b.startDate, b.endDate, startDate, endDate)) {
            return true
        }
    }
    return false
}

function getCompleteOverlapIDs(availabilities, startDate, endDate) {
    const ids = []
    Object.values(availabilities).forEach(a => {
        if (!hasConflict(a.bookings, startDate, endDate)) {
            ids.push(a.id)
        }
    })
    return ids
}

/**
 * 
 * @param {string} datestring "YYYY-MM-DD"
 */
function getDay(datestring) {
    return Date.parse(datestring) / MILLIS_IN_DAY
}

/**
 * 
 * @param {string} startDate "YYYY-MM-DD"
 * @param {string} endDate "YYYY-MM-DD"
 */
function getRange(startDate, endDate) {
    return { start: getDay(startDate), end: getDay(endDate) }
}

function buildPackagesFromPieces(availabilities, startDate, endDate) {
    const { start, end } = getRange(startDate, endDate)
    // day -> availabilities open that day
    const days = {}
    for (let i = start; i <= end; ++i) {
        days[i] = []
    }
    // For each availability, have a ranges of open dates
    // Each range has head. That head knows its length
    // Each date in the tail knows the head (and therefore knows its own length)
    for (const a of Object.values(availabilities)) {
        const { aStart, aEnd } = getRange(a.startDate, a.endDate)
        const unavailable = {}
        for (const b of a.bookings) {
            const { bStart, bEnd } = getRange(b.startDate, b.endDate)
            for (let i = bStart; i <= bEnd; ++i) {
                unavailable[i] = true
            }
        }
        const openDaysOfAvailability = []
        for (let i = aStart; i <= aEnd; ++i) {
            if (!unavailable[i]) { // this day is available
                let day = { availability: a }
                if (i === aStart || unavailable[i - 1]) {
                    // if it's the first day, then start an origin here
                    day.head = i
                    day.isHead = true
                    day.length = 1
                } else {
                    // use the previous one
                    const headDay = openDaysOfAvailability[i - 1].head
                    day.head = headDay
                    // update its length
                    ++openDaysOfAvailability[headDay].length
                }
                openDaysOfAvailability.push(day)
                days[i].push(day)
            }
        }
        // Construct a package greedily taking the longest length
        // TODO https://www.npmjs.com/package/flatqueue
    }

}

function buildPackages(availabilities, completeOverlapIDs, startDate, endDate) {
    if (completeOverlapIDs.length > 0) {
        // Plan A: return these availabilities
        const packages = []
        for (const id of completeOverlapIDs) {
            const a = availabilities[id]
            packages.push([{ availabilityId: id, startDate, endDate, workspaceId: a.workspaceId, comment: a.comment }])
        }
        return packages
    } else {
        // Plan B: build the packages from open dates
        return buildPackagesFromPieces(availabilities, startDate, endDate)
    }
}

async function makePackages(conditions) {
    const availabilities = await getAvailabilities(conditions)
    if (!availabilities) {
        return []
    }
    const completeOverlapIDs = getCompleteOverlapIDs(availabilities, conditions.startDate, conditions.endDate)
    return buildPackages(availabilities, completeOverlapIDs, conditions.startDate, conditions.endDate)
}

module.exports = { makePackages }
