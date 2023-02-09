// Creacion de las rutas para producción
// Rutas que no se especificaron
const express = require('express')
const createError = require('http-errors')

const { Response } = require('../common/response')

module.exports.IndexAPI = (app) => {
  const router = express.Router()

  // definimos URL INICIAL
  router.get('/', (req, res) => {
    const menu = { //Menu de los enlaces
      products: `https://${req.headers.host}/api/products`,
      users:`https://${req.headers.host}/api/users`
    }
    // req.headers.host nos indica la ruta donde esta alojado nuestra api
    Response.success(res, 200, 'API inventario', menu)
  })

  //usamos la ruta  con las rutas cargadas
  app.use('/', router)
}

module.exports.NotFoundAPI = (app) => {
  const router = express.Router()

  //todas las rutas que no tengamos configuradas
  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound())
    console.log("RUTA NOT-FOUND")
  })

  app.use('/', router)
}