const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    username: 'postgres',
    password: 'process.env.DB_PASS_DEV',
    database: 'process.env.DB_NAME_DEV',
    host: 'process.env.HOST_DEV',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'process.env.DB_PASS_TEST',
    database: 'process.env.DB_NAME_TEST',
    host: 'process.env.HOST_DEV',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
