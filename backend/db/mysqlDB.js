const { Client } = require('mysql')
require('dotenv').config();

const localOption = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Flex2020',
    database: 'test'
  }
}

const johnLocalOption = { // I (John) have slightly different settings for local DB
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'rootbeer',
    password: 'dara',
    database: 'test'
  }
}

const remoteOption = {
  client: 'mysql',
  connection: {
    host: 'flexdb.ckmtd5etwo6b.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Flex2020',
    database: 'flexWork'
  }
}



if (process.env.LOCAL_JOHN) {
  module.exports = require('knex')(johnLocalOption);
} else if (process.env.LOCAL) {
  module.exports = require('knex')(localOption);
} else {
  module.exports = require('knex')(remoteOption);
}