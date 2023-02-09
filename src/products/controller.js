/*
Porción de código destinado a controlar los errores responder 
a las peticiones usando una estandarización para respuestas
Interactua directamente con el servicio y recive las repuestas
de ahí.
*/
const { ProductsService: ps } = require('./services')
const { Response } = require('../common/response')
const createError = require('http-errors')

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ps.getAll() // es asincrono
      Response.success(res, 200, 'Lista de productos', products) //Usamon Common response para estandarizar las respuestas
    } catch (err) {
      Response.error(res)
      console.log('Error BD Controller getAll\n', err)
    }
  },
  getProduct: async (req, res) => {
    try {
      const { params: { id } } = req;
      let product = await ps.getById(id)
      //Por si no existe un producto
      if (!product) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, 'Producto', product)
      }
    } catch (error) {
      Response.error(res)
      console.log('Error BD Controller GetOne \n', error)
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length == 0) {
        // si no nos pasaron los datos
        Response.error(res, new createError.BadRequest())
      } else {
        const insertedId = await ps.create(body)
        console.log("Se añadió nuevo producto. ID: ", insertedId)
        Response.success(res, 200, 'Producto Creado', insertedId)
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
      console.log('Error BD Controller create\n', error)
    }
  },
  generateReport: async (req, res) => {
    try {
      ps.generateReport('Inventario', res)
    } catch (error) {
      console.log('Error Generar reporte\n')
      Response.error(res)
    }
  },
  updateProduct: async (req, res) => { //PUT
    try {
      const { params: { id } } = req;
      const { body } = req; //Sin ID
      if (!body || Object.keys(body).length == 0) {
        //no hay datos
        Response.error(res, new createError.BadRequest())
      } else {
        let result = await ps.updateP(id, body)
        if (result.modifiedCount != 0) {
          Response.success(res, 200, 'Producto actualizado', result)
        } else {
          Response.error(res, new createError.BadRequest())
          console.log("No se pudo actualizar registro, ID incorrecto")
        }
      }
    } catch (error) {
      console.log('Error actualizar Producto\n', error)
      Response.error(res)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { params: { id } } = req;
      const result = await ps.deleteP(id)
      if(result.deletedCount === 1){
        Response.success(res, 200, `Producto ${id} Eliminado`, result)
      }else{
        Response.error(res)
        console.log("ERROR AL ELIMINAR ID incorrecto", result)
      }
    } catch (error) {
      console.log('Error eliminar Producto\n', error)
      Response.error(res)
    }
  }
}