const express = require('express')
const { Config } = require('./src/config/index')
const { ProductsAPI } = require('./src/products/index')

const app = express()
app.use(express.json()) // El servidor puede interactuar con datos de tipo json en el body

// MODULOS
ProductsAPI(app) // Le enviamos la aplicacion

app.listen(Config.port, () => {
  console.log(`Server in port ${Config.port}`);
})
