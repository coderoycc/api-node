/*
Porción de código principal para recibir las peticiones y usar
las rutas, interactua directamente con el controller y este recibe 
los métodos y si existe el body para procesarlo y responder la 
peticion
*/
const express = require('express')
const {ProductsController} = require('./controller')

const router = express.Router()

module.exports.ProductsAPI = (app) => {
  router
    .get('/', ProductsController.getProducts) // localhost:3000/api/products
    .get('/report', ProductsController.generateReport)
    .get('/:id', ProductsController.getProduct) //localhost:300/api/products/23
    .post('/', ProductsController.createProduct)
    .put('/:id', ProductsController.updateProduct)
    .delete('/:id', ProductsController.deleteProduct)
    
    // Error en get (/:id) con (/report)
    // Cambiamos a /report primero y luego a /:id
    // Hará match con /report y luego con /:id

  app.use('/api/products', router) // Usa la ruta api/products como raiz
}