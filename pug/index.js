const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../handle/public"));
app.listen(8080, () => console.log('Server started on 8080'))

app.set('views', './view')
app.set('view engine', 'pug')
const productos = []
app.get('/productos', (req, res) => {
    res.render('index',{
        productos
    })
})
app.get('/',(req,res)=>{
  res.render('form',{
  })
  
})
app.post('/productos',(req,res)=>{
  const product = req.body;
  product.id = Math.max(...productos.map((producto) => producto.id)) + 1;
  if (product.id < 0) {
    product.id = 0;
  }
  productos.push(product);
  res.redirect('/')
})