const fs = require('fs')
const promisify = require('util').promisify

const knexOptions = require('../../db/noDBOption')
const TEST_DB_NAME = 'flexworktest'
const CREATE_TABLES_PATH = './sql/insert_table.sql'
const INSERT_TEST_DATA_PATH = './sql/generated/insert_data.sql'

let knex = require('knex')(knexOptions)

function readFile(path) {
    return promisify(fs.readFile)(path, 'utf8')
}

async function createTables() {
    const mysql = await readFile(CREATE_TABLES_PATH)
    await knex.raw(mysql)
    console.log("Created Test Tables.")
}

async function insertTestData() {
    console.log("About to insert test data... it will take a while.")
    const mysql = await readFile(INSERT_TEST_DATA_PATH)
    await knex.raw(mysql)
    console.log("Inserted Test Data.")
}

/**
 * Drops the test DB, creates a new test DB, and inserts fake data (5000 employees & workspaces, 1000 bookings)
 */
async function init() {
    await knex.raw(`DROP DATABASE IF EXISTS ${TEST_DB_NAME}`)
    await knex.raw(`CREATE DATABASE ${TEST_DB_NAME}`)
    console.log("Test DB created.")
    knex.destroy()
    knexOptions.connection.database = TEST_DB_NAME
    knex = require('knex')(knexOptions)
    await createTables()
    await insertTestData()
    return knex
}


function connect() {
    knexOptions.connection.database = TEST_DB_NAME
    return require('knex')(knexOptions)
}

module.exports = { init, connect }