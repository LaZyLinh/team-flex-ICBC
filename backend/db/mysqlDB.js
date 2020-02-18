const { Client } = require('mysql')

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




const knex = process.env.LOCAL ? require('knex')(localOption) : require('knex')(remoteOption);

module.exports = knex;