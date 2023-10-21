import express, { Request, Response } from "express";
const mongoose = require("mongoose");
import  conectar  from "./database/db";
const app = express();
import router from "./Routes/userRoute";
//Rotas da API
app.use(express.json());
app.use('/',router);

// rota inicial / endpoint
app.get("/home", (req: Request, res: Response) => {
  // mostrar req
  res.json({ message: "Express online!" });
}); 

// Ler JSON / middlewares
app.use(express.urlencoded());

conectar();

const port = 3000;
app.set("view enginem", "ejs");
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
