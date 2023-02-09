// Estandarizar nuestras respuestas 
// Estructurar los datos al responder
const createError = require('http-errors') //gestionamos errores

module.exports.Response = {
  success: (res, status=200, message='OK', body={}) => {
    //correcto
    res.status(status).json({message, body})
  },
  error: (res, error=null) => {
    const { statusCode, message } = error ? error : new createError.InternalServerError()
    res.status(statusCode).json({message})  
  }
}