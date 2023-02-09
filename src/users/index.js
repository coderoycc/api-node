const express = require('express')
const { UsersController } = require('./controller')

const router = express.Router()

module.exports.UsersAPI = (app) => { //Exportamos la API para que se pueda usar en el index principal (RAIZ)
  router
    .get('/', UsersController.getUsers) // localhost:3000/api/products
    .get('/:id', UsersController.getUser) //localhost:300/api/products/23
    .post('/', UsersController.createUser)
    .put('/:id', UsersController.updateUser)
    .delete('/:id', UsersController.deleteUser)

  app.use('/api/users', router) // Usa la ruta api/users como raiz
}