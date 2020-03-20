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

function makeAvailability(availabilityId, startDate, endDate, workspaceId, comment) {
  return { id: availabilityId, startDate, endDate, workspaceId, comment, bookings: [] }
}

/**
 * @returns map object (id -> availability) if any fall into conditions, null otherwise
 */
async function getAvailabilities(conditions) {
  const subquery = buildSubquery(conditions)
  // StartDate, EndDate, WorkspaceId, Comment
  const availabilitiesQuery = `SELECT * FROM availability WHERE AvailabilityId IN ` + subquery
  // Get the current bookings on these availabilities
  const bookingsQuery = `SELECT a.AvailabilityId, b.StartDate, b.EndDate
                           FROM availability a
                           INNER JOIN booking b
                           WHERE a.AvailabilityId IN ` + subquery

  const results = await Promise.all([resultFromKnex(availabilitiesQuery), resultFromKnex(bookingsQuery)])
  const availabilitiesRows = results[0]
  if (availabilitiesRows.length === 0) {
    return null
  }
  const bookingsRows = results[1]
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

function unixDayToISO(day) {
  return new Date(day * MILLIS_IN_DAY).toISOString().substring(0, 10)
}

function makeBookingSuggestion(start, { availability, length }) {
  return {
    availabilityId: availability.id,
    startDate: unixDayToISO(start),
    endDate: unixDayToISO(start + length),
    workspaceId: availability.workspaceId,
    comment: availability.comment
  }
}

function buildPackageFromMultipleAvailabilities(availabilities, startDate, endDate) {
  const { start, end } = getRange(startDate, endDate)
  // day -> availabilities open that day
  const bestDaysOfAllAvailabilities = {}
  // For each availability, have a ranges of open dates
  // Each range has head. That head knows its length
  // Each date in the tail knows the head (and therefore knows its own length)
  for (const availability of Object.values(availabilities)) {
    const { aStart, aEnd } = getRange(availability.startDate, availability.endDate)
    const unavailable = {}
    for (const booking of availability.bookings) {
      const { bStart, bEnd } = getRange(booking.startDate, booking.endDate)
      for (let i = bStart; i <= bEnd; ++i) {
        unavailable[i] = true
      }
    }
    const daysInSingleAvailability = {} // day number -> day object
    for (let i = aStart; i <= aEnd; ++i) {
      if (!unavailable[i]) { // this day is available
        let day = { availability: availability }
        if (i === aStart || unavailable[i - 1]) {
          // if it's the first day, then start an origin here
          day.head = i
          day.isHead = true
          day.length = 1
        } else {
          // use the previous one
          const head = daysInSingleAvailability[i - 1].head
          day.head = head
          // update its length
          ++daysInSingleAvailability[head].length
        }
        daysInSingleAvailability[i] = (day)
      }
    }
    for (const i in daysInSingleAvailability) {
      const day = daysInSingleAvailability[i]
      // If day is not a head (start of streak) then calculate its length based on its head's length
      if (!day.isHead) {
        const idxHead = day.head
        const headLen = daysInSingleAvailability[idxHead].length
        // length of streak of open days starting at day i is the head's len - diff between i and idxHead
        day.length = headLen - (i - idxHead)
      }
      // If this is better than the current availability at day i, globally, then update it
      if (!bestDaysOfAllAvailabilities[i] || bestDaysOfAllAvailabilities[i].length < day.length) {
        bestDaysOfAllAvailabilities[i] = day
      }
    }
  }
  const package = []
  let i = start
  while (i <= end) {
    if (!bestDaysOfAllAvailabilities[i]) {
      // a required day has no opening at all
      return []
    } else {
      // add suggested booking
      const day = bestDaysOfAllAvailabilities[i]
      package.push(makeBookingSuggestion(i, day))
      i += day.length
    }
  }
  return package
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
    // Plan B: build the best package from open dates
    return [buildPackageFromMultipleAvailabilities(availabilities, startDate, endDate)]
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
