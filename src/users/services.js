const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')
const COLLECTION = 'users' //Nombre de la coleccion
/*La Coleccion se crea automanticamente*/
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

const create = async (product) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(product) //propio de mongo asincrono
  return result.insertedId
}

const updateU = async (id, data) => {
  id = new ObjectId(id)
  const collection = await Database(COLLECTION)
  return await collection.updateOne({ _id: id }, {
    $set: data
    // data es el body solo campos enviados
  })
}

const deleteU = async (id) => {
  id = new ObjectId(id)
  const collection = await Database(COLLECTION)
  return await collection.deleteOne({ _id: id })
}

module.exports.UsersService = {
  getAll,
  getById,
  create,
  updateU,
  deleteU
}