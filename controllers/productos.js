const Contenedor = require('../server/content.js')
const prod = new Contenedor('../datos.json')

class ControllerProductos {
    show = async (req,res) => {
        const getProds = await prod.getAll()
        res.status(200).send(getProds)
    }
    showById = async (req,res) => {
        const { id } = req.params
        res.status(200).send(await prod.getById(id))
    }
    save = async (req,res) => {
        const { body } = req 
        await prod.save(body)
        res.status(200).send('Producto guardado')
    }
    update = async (req,res) => {
        const { id } = req.params
        const { body } = req
        await prod.updateById(id, body)
        res.status(200).send('Producto actualizado')
    }
    deleteById = async (req,res) => {
        const { id } = req.params
        await prod.deleteById(id)
        res.status(200).send('Producto eliminado')
    }
}
module.exports = ControllerProductos