import Axios from "axios";
import { BASE_URL } from "./BaseUrl";

const axios = Axios.create({
  baseURL: BASE_URL
});

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24
const PST_OFFSET_MILLIS = 1000 * 60 * 60 * 8

function dateStrToUnixDay(dateStr) {
  return Math.floor(Date.parse(dateStr).valueOf() / MILLIS_IN_DAY)
}

function unixDayToDate(day) {
  return new Date(day * MILLIS_IN_DAY - PST_OFFSET_MILLIS)
}

function addDateRangeToDatesArrs(datesArr, unixDaysArr, startDateStr, endDateStr) {
  const startUnixDay = dateStrToUnixDay(startDateStr)
  const endUnixDay = dateStrToUnixDay(endDateStr)
  for (let i = startUnixDay; i <= endUnixDay; ++i) {
    unixDaysArr.push(i)
    datesArr.push(unixDayToDate(i))
  }
}

/**
 * Returns an array of dates that the user has a booking on
 * @param {number} staffId 
 */
async function disabledAndEarliestOpenDates(staffId) {
  try {
    const bookings = (await axios.get(`/bookings?staffId=${staffId}`)).data
    const disabledDates = [];
    const unixDays = [];
    for (const b of bookings) {
      if (b.Confirmed === 1) {
        addDateRangeToDatesArrs(disabledDates, unixDays, b.BookingStartDate.substr(0, 10), b.BookingEndDate.substr(0, 10))
      }
    }
    let earliestOpenDay = dateStrToUnixDay(new Date().toISOString().substr(0, 10))
    while (unixDays.includes(earliestOpenDay)) {
      ++earliestOpenDay
    }
    const earliestOpenDate = unixDayToDate(earliestOpenDay)
    return { disabledDates, earliestOpenDate }
  } catch (err) {
    console.log(err)
    return { disabledDates: [], earliestOpenDate: new Date() }
  }
}

export default disabledAndEarliestOpenDates
