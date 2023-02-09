/*
Porcion de código destinado a conectarse a la base de datos
interactuar con los métodos que existen en la base de datos
y pasar los resultados al controller
*/
const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')
const { ProductsUtils } = require('./utils')
const COLLECTION = 'products'

const getAll = async () => {
  //Trae todos los datos de nuetra base de datos
  const collection = await Database(COLLECTION)
  // Database devuelve una promesa** Por eso ponemos await a la Database y async al inicio de la funcion
  return await collection.find({}).toArray() //Propio de MONGO
}

const getById = async (id) => {
  const collection = await Database(COLLECTION)
  return collection.findOne({ _id: new ObjectId(id) })
  //mongo necesita un Objeto ID 
}

const generateReport = async (name, res) => {
  let products = await getAll()
  ProductsUtils.excelGenerator(products, name, res)
}

const create = async (product) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(product) //propio de mongo asincrono
  return result.insertedId
}

const updateP = async (id, data) => {
  id = new ObjectId(id)
  const collection = await Database(COLLECTION)
  return await collection.updateOne({ _id: id }, {
    $set: {
      name: data.name,
      precio: data.precio,
      cantidad: data.cantidad
    }
  })
}

const deleteP = async (id) => {
  id = new ObjectId(id)
  const collection = await Database(COLLECTION)
  return await collection.deleteOne({ _id: id })
}

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport,
  updateP,
  deleteP
}