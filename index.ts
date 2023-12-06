import express, { Request, Response } from "express";
import conectar from "./database/db";
import router from "./Routes/userRoute";
import path from "path";
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.render('login')
});

app.set('views', './View');
app.get('/cadastrar', (req, res) => {
  res.render('index')
})
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(router);
conectar();

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
