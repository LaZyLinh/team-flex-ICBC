function daysToMillis(num) {
    return num * 24 * 60 * 60 * 1000;
}

const QUOTES = "Genius is one percent inspiration and ninety-nine percent perspiration.,You can observe a lot just by watching.,A house divided against itself cannot stand.,Difficulties increase the nearer we get to the goal.,Fate is in your hands and no one elses,Be the chief but never the lord.,Nothing happens unless first we dream.,Well begun is half done.,Life is a learning experience... only if you learn.,Self-complacency is fatal to progress.,Peace comes from within. Do not seek it without.,What you give is what you get.,We can only learn to love by loving.,Life is change. Growth is optional. Choose wisely.,Youll see it when you believe it.,Today is the tomorrow we worried about yesterday.,Its easier to see the mistakes on someone elses paper.,Every man dies. Not every man really lives.,To lead people walk behind them.,Having nothing... nothing can he lose.,Trouble is only opportunity in work clothes.,A rolling stone gathers no moss.,Ideas are the beginning points of all fortunes.,Everything in life is luck.,Doing nothing is better than being busy doing nothing.,Trust yourself. You know more than you think you do.,Study the past... if you would divine the future.,The day is already blessed... find peace within it.,From error to error one discovers the entire truth.,Well done is better than well said."
const quotes = QUOTES.split(',')

function randomItem(arr) {
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}


function dateString(millis) {
    return `'${new Date(millis).toISOString().substr(0, 10)}'`
}


function generate(sql, workspaces, maxStaffId, quantity, toTestArchiving) {
    const now = Date.now().valueOf() // millis
    // If we testing the archive function, curr will be set back 30 days in the past
    // Else, it's set 7 days in the future to leave the next 7 days for unit testing
    const curr = toTestArchiving ? now - daysToMillis(30) : now + daysToMillis(7)
    for (let i = 1; i <= quantity; ++i) {
        const AvailabilityId = i
        const BookingId = i
        const WorkspaceId = workspaces[i % workspaces.length]
        const StaffId = (i + 1000) % maxStaffId
        const startDateMillis = curr + daysToMillis(i % 60)
        const endDateMillis = curr + daysToMillis((i % 60) + 3)
        const StartDate = dateString(startDateMillis)
        const AvailabilityEndDate = dateString(endDateMillis)
        const Comment = Math.random() < 0.2 ? `'${randomItem(quotes)}'` : `NULL`
        const bookingDays = Math.floor(Math.random() * 3)
        const bookingEndDateMillis = curr + daysToMillis((i % 60) + bookingDays)
        const BookingEndDate = dateString(bookingEndDateMillis)
        sql.script += `INSERT INTO availability VALUES (${AvailabilityId}, ${StartDate}, ${AvailabilityEndDate}, ${WorkspaceId}, ${Comment});\n`
        sql.script += `INSERT INTO booking VALUES (1, ${BookingId}, ${StartDate}, ${BookingEndDate}, ${StaffId}, ${AvailabilityId}, ${WorkspaceId});\n`
    }
}

module.exports = { generate }