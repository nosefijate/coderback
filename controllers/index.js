const ControllerProductos = require('./productos.js')
const products = new ControllerProductos
const Router = require('express')
const routerProductos = new Router()

routerProductos.get("/", products.show)
routerProductos.get("/:id", products.showById)
routerProductos.post("/", products.save)
routerProductos.put("/:id", products.update)
routerProductos.delete("/:id", products.deleteById)

module.exports = routerProductos