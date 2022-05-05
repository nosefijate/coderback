const ControllerProductos = require('./productos.js')
const products = new ControllerProductos
const Router = require('express')
const { ControllerCarritos } = require('./carritos.js')
const routerProductos = new Router()

routerProductos.get("/", products.show)
routerProductos.get("/:id", products.showById)
routerProductos.post("/", products.save)
routerProductos.put("/:id", products.update)
routerProductos.delete("/:id", products.deleteById)

const carts = new ControllerCarritos ()
const routerCarrito = new Router ()

routerCarrito.get("/:id/productos", carts.mostrarPorId)
routerCarrito.put("/:id/productos", carts.actualizar)
routerCarrito.delete("/:id/productos/:id", carts.borrarProducto)
routerCarrito.post("/", carts.guardar)
routerCarrito.delete("/:id", carts.borrarCarrito)

module.exports = routerCarrito
module.exports = routerProductos