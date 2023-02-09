const express = require('express')
const { Config } = require('./src/config/index')
const { ProductsAPI } = require('./src/products/index')
const { UsersAPI } = require('./src/users/index')
const { IndexAPI, NotFoundAPI } = require('./src/index/index')

const app = express()
app.use(express.json()) // El servidor puede interactuar con datos de tipo json en el body

// MODULOS
/*
La primera ruta hace match antes que las siguientes
*/
IndexAPI(app)
ProductsAPI(app) // Le enviamos la aplicacion
UsersAPI(app)
NotFoundAPI(app)


app.listen(Config.port, () => {
  console.log(`Server in port ${Config.port}`);
})
