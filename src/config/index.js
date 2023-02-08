// USAMOS DOTENV
require('dotenv').config()

module.exports.Config = {
  port: process.env.PORT, //accedemos a PORT de .env
  mongoUri: process.env.MONGO_URI,
  mongoDBname: process.env.MONGO_DBNAME
}