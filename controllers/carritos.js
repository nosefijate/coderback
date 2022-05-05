import { Carrito } from "../server/carrito.js";
const carrito = new Carrito("../carritos.json");
import { prod } from "./productos.js";

export class ControllerCarritos {
  mostrarPorId = async (req, res) => {
      const getCar = await carrito.getById(Number(req.params.id));
      if(getCar){
          let productsEnCar = []
          productsEnCar = getCar.products;
          res.render("../views/carrito", {
              getCar,
              productsEnCar
          });
      }else{
          res.send('El carrito no existe')
      }
  };
  guardar = async (req, res) => {
    await carrito.save({ products: [] });
    res.status(200).send("Carrito guardado");
  };
  actualizar = async (req, res) => {
    const car = await carrito.getById(req.params.id);
    const product = await prod.getById(req.body.id);
    car.products.push(product);
    await carrito.updateById(car, Number(req.params.id));
  };
  borrarCarrito = async (req, res) => {
    await carrito.deleteById(Number(req.params.id));
    res.status(200);
  };
  borrarProducto = async (req, res) => {
    await carrito.deleteProductById(Number(req.params.id), Number(req.body.id));
    res.status(200);
  };
}