import express, { Request, Response } from "express";
const mongoose = require("mongoose");
import conectar from "./database/db";
const app = express();
import router from "./Routes/userRoute";
import path from "path";
//Rotas da API
app.use(express.json());

// rota inicial / endpoint
app.get("/", (req, res) => {
  // mostrar req
  res.json({ message: "Express online!" });
});
const port = 3000;

// Ler JSON / middlewares
app.set('views', './View');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(router);
conectar();

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
