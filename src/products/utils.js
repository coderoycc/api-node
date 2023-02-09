const excelGenerator = (products, name ,res) => {
  const xl = require('excel4node')
  products = products.map((product) => {
    let id = product._id.toString() 
    // Usando el valor id (propio de mongo) de cada producto y convirtiendolo a string
    delete product._id
    return {
      id,
      ...product
    }
  })

  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Inventario') //Agregamos una nueva hoja

  for (let index = 1; index <= products.length; index++) { //Productos
    for(let j = 1; j <= Object.values(products[0]).length; j++){ //Propiedades
      let data = Object.values(products[index-1])[j - 1] //valores por celda
      if(typeof data == 'string'){
        ws.cell(index,j).string(data)
      }else{
        ws.cell(index,j).number(data)
      }
    }    
  }

  wb.write(`${name}.xlsx`, res)
}

module.exports.ProductsUtils = {
  excelGenerator
}