const express = require ('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const routerProductos = require('./controllers/index.js')

const PORT = 8080
app.listen(PORT,() =>{
    console.log('Server escuchando el puerto 8080')
})
app.use('/api/products', routerProductos)
app.get('/api/additem', (req, res) => {
    res.sendFile(__dirname + '/views/main.html')
})
app.get('*',(req,res)=>{
    res.send({
        error: -2,
        descripcion: `Ruta ${req.path} no implementada`
    })
})