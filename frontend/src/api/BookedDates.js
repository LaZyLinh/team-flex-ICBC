import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://icbcflexwork.me:8080/'
});

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24

function dateStrToUnixDay(dateStr) {
  return Math.floor(Date.parse(dateStr).valueOf() / MILLIS_IN_DAY)
}

function unixDayToDate(day) {
  return new Date(day * MILLIS_IN_DAY)
}

function addDateRangeToDatesArr(datesArr, startDateStr, endDateStr) {
  const startUnixDay = dateStrToUnixDay(startDateStr)
  const endUnixDay = dateStrToUnixDay(endDateStr)
  for (let i = startUnixDay; i <= endUnixDay; ++i) {
    datesArr.push(unixDayToDate(i))
  }
}

/**
 * Returns an array of dates that the user has a booking on
 * @param {number} staffId 
 */
async function bookedDates(staffId) {
  try {
    const bookings = (await axios.get(`/bookings?staffId=${staffId}`)).data
    const dates = [];
    for (const b of bookings) {
      if (b.Confirmed === 1) {
        addDateRangeToDatesArr(dates, b.BookingStartDate.substr(0, 10), b.BookingEndDate.substr(0, 10))
      }
    }
    return dates
  } catch (err) {
    console.log(err)
    return []
  }
}

export default bookedDates
