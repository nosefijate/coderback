const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Contenedor = require('./server/content.js')
const ContMensajes = require('./server/msjs.js')
const express = require("express");
const { engine } = require("express-handlebars");
const msj = new ContMensajes('./usuarios.json')
const prod = new Contenedor('./datos.json')
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
httpServer.listen(8080, () => console.log('Server started on 8080'))
app.engine( "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.use("api/productos", routerProductos);
app.use("/api/carritos", routerCarritos);
app.get("/form", (req, res) => {
  res.render("form",{
    
  });

})

io.on('connection', async (socket)=>{
  console.log('Usuario conectado')
  socket.on('disconnect', ()=>{
      console.log('Usuario desconectado')
  })
  socket.emit("productos", await prod.getAll());
  socket.on("update", async (data)=>{  
      await prod.save(data);
      io.sockets.emit("productos", await prod.getAll());
  })
  socket.emit("mensaje", await msj.getAll())
  socket.on("mensajes", async (data)=>{
      await msj.save(data)
      io.sockets.emit("mensaje", await msj.getAll())
    })
})

app.get("/productos", async (req, res) => {
  res.render("main", {
  });
});