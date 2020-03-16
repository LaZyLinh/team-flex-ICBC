/**
 * Creates up-to-date .sql file
 */
const OfficeGenerator = require('./OfficeGenerator')
const EmployeeGenerator = require('./EmployeeGenerator')
const BookingGenerator = require('./BookingGenerator')

const fs = require('fs')
const promisify = require('util').promisify


const OUTPUT_PATH = './sql/generated/insert_data.sql'

const FEATURES = ["TV", "Private", "Conference Phone"]
const CITIES = [
    { name: "Vancouver", initials: "V" },
    { name: "North Vancouver", initials: "NV" },
    { name: "West Vancouver", initials: "WV" },
    { name: "Surrey", initials: "S" },
    { name: "Richmond", initials: "R" }
]
const BUILDINGS_PER_CITY = 2
const FLOORS_PER_BUILDING = 5
const WORKSPACES_PER_FLOOR = 100
const NUM_EMPLOYEES = 5000
const NUM_BOOKINGS = 1000

// The .sql script is built here
const sql = {
    script: ''
}

function writeToFile() {
    return promisify(fs.writeFile)(OUTPUT_PATH, sql.script)
}

function beginSection(message) {
    sql.script += `-- ${message}\n`
}

function endSection() {
    sql.script += `\n\n`;
}

function generateFeatures() {
    beginSection("Features")
    let id = 1;
    for (const featureName of FEATURES) {
        sql.script += `INSERT INTO feature VALUES (${id++}, '${featureName}');\n`
    }
    endSection()
}

function generateEmployees() {
    beginSection("Employees")
    EmployeeGenerator.generate(sql, NUM_EMPLOYEES)
    endSection()
}

function generateOffices() {
    beginSection("Floors and Workspaces")
    workspaces = OfficeGenerator.generate(sql, CITIES, FEATURES.length, BUILDINGS_PER_CITY, FLOORS_PER_BUILDING, WORKSPACES_PER_FLOOR, NUM_EMPLOYEES)
    endSection()
    return workspaces
}


function generateBookings(workspaces, toTestArchiving) {
    beginSection("Availabilities and Bookings")
    BookingGenerator.generate(sql, workspaces, NUM_EMPLOYEES, NUM_BOOKINGS, toTestArchiving)
    endSection()
}

async function generate(toTestArchiving = false) {
    generateFeatures()
    generateEmployees()
    const workspaces = generateOffices()
    generateBookings(workspaces, toTestArchiving)
    await writeToFile()
}

module.exports.generate = generate;