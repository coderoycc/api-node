# CRUD CON NODE JS y EXPRESS
## Estructura de carpetas
* `src` contiene todas las carpetas de nuestro proyecto
  * `common` contiene una estandarización de errores http
  * `config` contiene las variables de entorno
  * `database` contiene las coneciones a la base de datos
  * `index` contiene las rutas que no existen y un menú con rutas de la api que existen
  * `products` contiene la api de los productos
    - `controller.js` se encarga de interactuar con **services** para hacer las peticiones a la base de datos
    - `index.js` se encarga de englobar todos los archivos requeridos interactua con **controllers** para procesar de acuerdo al _path_ y envia las peticiones al **index.js** de la raiz
    - `services.js` se encarga de interactuar con la base de datos
    - `utils.js` se encarga de generar reporte sobre produtos
  * `users` Contiene la api de los usuarios
    - Tiene las mismas cosas que **products**
  * `sales` Completar con:
    - lógica de negocio como: ventas por un usuario de algún producto, almacenar el producto, y la cantidad de ventas registradas
* `index.js` es el archivo principal para ejecutar toda la aplicación, interactua con los módulos (APIS) y inicia el servidor