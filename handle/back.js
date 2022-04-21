const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.listen(8081, () => console.log("Server started on 8081"));


const { engine } = require("express-handlebars");
app.engine(
  "handle",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/index.hbs",
  })
)

app.set("views", "./views");

app.set("view engine", "handle");

const productos = []

app.get("/productos", (req, res) => {
  res.render("main", {
    productos,
  });
});

app.get("/form", (req, res) => {
  res.render("form", {});
});

app.post("/productos", (req, res) => {
  const { body } = req;
  productos.push(body);
  res.redirect("/form");
});