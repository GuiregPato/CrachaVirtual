import express, { Request, Response, Router, NextFunction } from "express";
import Usuario from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
require("dotenv").config();

router.use(express.json());
//Rota privada
router.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //Checar se usuario existe
  const user = await Usuario.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuario não encontrado" });
  }
  res.status(200).json({ user });
});

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ Server: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ Server: "token invalido" });
  }
}
//Cadastrar Usuario
router.post("/cadastro", async (req, res) => {
  const { name, lastname, address, age, email, password } = req.body;

  //Checa se todos os campos estão preenchidos
  if (!name || !lastname || !address || !age || !email || !password) {
    return res.status(500).json({ message: "Preencha todos os campos!" });
  }

  //Checar se usuario existe
  const emailExist = await Usuario.findOne({ email: email });
  if (emailExist) {
    return res.status(422).json({ message: "Email já existe!" });
  }

  //criar senha
  const salt = await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(password, salt);

  try {
    const user = { name, lastname, address, age, email, password: passHash };
    await Usuario.create(user);
    res.redirect('/')
  } catch (error) {
    res.status(500).json({ message: "Usuario não inserido", error });
  }
});

//Logar Usuario
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  //Validações
  if (!email || !password) {
    return res.status(500).json({ message: "Preencha todos os campos!" });
  }

  const user = await Usuario.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "Usuario não encontrado" });
  }
  //Checar senha
  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) {
    return res.status(422).json({ message: "Senha incorreta" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    )
    res.status(200).json({ ms: "Autenticado com sucesso!", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Server: "Aconteceu um erro" });
  }
});

//Mostrar Usuarios
router.get("/todos", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Usuario não ", error });
  }
});
//encontar usuario pelo ID
router.get("/home/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Usuario.findOne({ _id: id });
    if (!users) {
      res.status(422).json({ message: "Usuario não encontrado" });
      return;
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Usario não " });
  }
});

// Deletar Usuario
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Usuario.deleteMany({ name: id });
    if (!users) {
      res.status(422).json({ message: "Usuario não encontrado" });
      return;
    }
    res.status(200).json(users);
  } catch (error) { 
    res.status(500).json({ message: "Usario não encontrado" });
  }
});

//Atualizar Usuario

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, lastname, address, age } = req.body;
  const User = {
    name,
    lastname,
    address,
    age,
  };
  if (User) {
    res.status(422).json({ msg: "Usuario não existe!" });
  } else {
    try {
      const UpdateUser = await Usuario.updateOne({ _id: id }, User);
      res.status(201).json({ message: "Usuario atualizado com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: "Usario não encontrado" });
    }
  }
});
export default router;
