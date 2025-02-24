require('dotenv').config()


module.exports = {
  "development": {
    "username": process.env.SQL_USERNAME,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_DB,
    "host": process.env.HOST,
    "dialect": process.env.DB
  },
"test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}