require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    username: 'postgres',
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.HOST_DEV,
    port: 5432,
    operatorsAliases: false
  },
  test: {
    username: 'postgres',
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.HOST_DEV,
    dialect: 'postgres',
    logging: false
  },
};

// module.exports = config['development'];
