// Usamos el controlador de mongodb
const {MongoClient} = require('mongodb')
const { Config } = require('../config/index')
var conn = null;

// NO SQL
// Patron SINGLETON una sola conexion
const database = (collection) => new Promise(
  async (resolve, reject) => {
  try{

    if(!conn){
      const client = new MongoClient(Config.mongoUri);
      conn = await client.connect() //conexion asincrona
      console.log("nueva conexion realizada Mongo Atlas");
    }
    const db = conn.db(Config.mongoDBname) // nos conectamos a la bd
    resolve(db.collection(collection))
  }catch(err){
    reject("BD error\n",err)
  }
})

module.exports.Database = database