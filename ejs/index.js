const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './view');
app.set('view engine', 'ejs');
app.use(express.static('../handle/public'))

const productos = []

app.get('/productos', (req, res) => {
    res.render('index',{
        productos
    })    
})
app.get('/',(req,res)=>{
    res.render('form',{
        productos        
    })
})

app.post('/productos', (req, res) => {    
    const product = req.body;
    
    productos.push(product);
    res.redirect('/')
})
