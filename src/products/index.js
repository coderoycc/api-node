const express = require('express')
const {ProductsController} = require('./controller')

const router = express.Router()

module.exports.ProductsAPI = (app) => {
  router
    .get('/', ProductsController.getProducts) // localhost:3000/api/products
    .get('/:id', ProductsController.getProduct) //localhost:300/api/products/23
    .post('/', ProductsController.createProduct)

  app.use('/api/products', router) // Usa la ruta api/products como raiz
}