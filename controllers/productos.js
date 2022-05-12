import { Products } from './server/content.js'
import { configSql2 } from './config.js'
export const prod = new Products(configSql2,"productos")

export class ControllerProducts {
  show = async (req, res) => {
    const getProds = await prod.getAll();
    res.render('main',{
      getProds
    })
  };
  showById = async (req, res) => {
    const { id } = req.params;
    const findById = await prod.getById(id)
    res.send(findById)
  };
  save = async (req, res) => {
    const { body } = req;
    await prod.save(body);
    res.status(200).send('Producto agregado')
  };
  updateOne = async (req, res) => {
    const { id } = req.params;
    const { body } = req
    await prod.updateById(id, body);
    res.sendStatus(200)
  };
  deleteOne = async (req, res) => {
    const { id } = req.params;
    await prod.deleteById(id);
    res.sendStatus(200)
  };
}