const { UsersService: us } = require('./services')
const { Response } = require('../common/response') //respuestas unificadas
const createError = require('http-errors')

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await us.getAll() // es asincrono
      Response.success(res, 200, 'Lista de Usuarios', users) //Usamon Common response para estandarizar las respuestas
    } catch (err) {
      Response.error(res)
      console.log('Error BD Controller getAll\n', err)
    }
  },
  getUser: async (req, res) => {
    try {
      const { params: { id } } = req;
      let user = await us.getById(id)
      //Por si no existe un producto
      if (!user) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, 'Usuario', user)
      }
    } catch (error) {
      Response.error(res)
      console.log('Error BD Controller GetOne USER\n', error)
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length == 0) {
        // si no nos pasaron los datos
        Response.error(res, new createError.BadRequest())
      } else {
        const insertedId = await us.create(body)
        console.log("Se añadió nuevo usuario. ID: ", insertedId)
        Response.success(res, 200, 'usuario Creado', insertedId)
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
      console.log('Error BD Controller create user\n', error)
    }
  },
  updateUser: async (req, res) => { //PUT 
    //Actualiza los campos enviados
    try {
      const { params: { id } } = req;
      const { body } = req; //Sin ID
      if (!body || Object.keys(body).length == 0) {
        //no hay datos
        Response.error(res, new createError.BadRequest())
      } else {
        let result = await us.updateU(id, body)
        if (result.modifiedCount != 0) {
          Response.success(res, 200, 'Usuario actualizado', result)
        } else {
          Response.error(res, new createError.BadRequest())
          console.log("No se pudo actualizar usuario, ID incorrecto")
        }
      }
    } catch (error) {
      console.log('Error actualizar Usuario\n', error)
      Response.error(res)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { params: { id } } = req;
      const result = await us.deleteU(id)
      if(result.deletedCount === 1){
        Response.success(res, 200, `usuario ${id} Eliminado`, result)
      }else{
        Response.error(res)
        console.log("ERROR AL ELIMINAR usuario ID incorrecto", result)
      }
    } catch (error) {
      console.log('Error eliminar Usuario\n', error)
      Response.error(res)
    }
  }
}