import express, { Request, Response } from "express";
const mongoose = require("mongoose");
import { conectar } from "./database/db";
const app = express();

//Rotas da API
import router from "./Routes/userRoute";
app.use(router);

// rota inicial / endpoint
app.get("/", (req: Request, res: Response) => {
  // mostrar req
  res.json({ message: "Express online!" });
});

// Ler JSON / middlewares
app.use(express.urlencoded());
app.use(express.json());
conectar();

const port = 3000;
app.set("view enginem", "ejs");
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
