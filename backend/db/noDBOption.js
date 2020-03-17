require('dotenv').config()

const localOptionNoDB = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Flex2020',
    multipleStatements: true
  }
}

const johnLocalOptionNoDB = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'rootbeer',
    password: 'dara',
    multipleStatements: true
  }
}

const remoteOptionNoDB = {
  client: 'mysql',
  connection: {
    host: 'flexdb.ckmtd5etwo6b.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Flex2020',
    multipleStatements: true
  }
}


if (process.env.LOCAL_JOHN) {
  module.exports = johnLocalOptionNoDB
} else if (process.env.LOCAL) {
  module.exports = localOptionNoDB
} else {
  module.exports = remoteOptionNoDB
}