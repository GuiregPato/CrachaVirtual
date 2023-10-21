import express, { Request, Response } from "express";
import Usuario from "../models/User";
const bcrypt = require("bcrypt");
const router = express.Router();

//Cadastrar Usuario

router.post("/send", async (req: Request, res: Response) => {
  const { name, lastname, adress, age, email, password } = req.body;
 

  //Checa se todos os campos estão preenchidos

  if (!name || !lastname || !adress || !age || !email || !password) {
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
    const user = { name, lastname, adress, age, email, password: passHash};
    await Usuario.create(user);
    res.status(201).json({ message: "Usuario inserido no sistema" });
  } catch (error) {
    res.status(500).json({ message: "Usuario não inserido", error });
  }
});

//Logar Usuario
router.post("/login", async (req, res) => {
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
});

//Mostrar Usuarios
router.get("/", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Usuario não encontrado", error });
  }
});
// encontar usuario pelo ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Usuario.findOne({ _id: id });
    if (!users) {
      res.status(422).json({ message: "Usuario não encontrado" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Usario não encontrado" });
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
  const { name, lastname, adress, age } = req.body;
  const User = {
    name,
    lastname,
    adress,
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
