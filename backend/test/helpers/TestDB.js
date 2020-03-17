const fs = require('fs')
const promisify = require('util').promisify

const knexOptions = require('../../db/noDBOption')
const DEFAULT_TEST_DB_NAME = 'flexworktest'
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
 * Drops the test DB, creates a new test DB
 */
async function reset(shouldInsertData = false, testDBName = DEFAULT_TEST_DB_NAME) {
    await knex.raw(`DROP DATABASE IF EXISTS ${testDBName}`)
    await knex.raw(`CREATE DATABASE ${testDBName}`)
    console.log("Test DB created.")
    knex.destroy()
    knexOptions.connection.database = testDBName
    knex = require('knex')(knexOptions)
    await createTables()
    if (shouldInsertData) {
        await insertTestData()
    }
    return knex
}


function connect(testDBName = DEFAULT_TEST_DB_NAME) {
    knexOptions.connection.database = testDBName
    return require('knex')(knexOptions)
}


module.exports = { reset, connect }