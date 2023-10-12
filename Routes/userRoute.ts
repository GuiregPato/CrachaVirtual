import express, { Request, Response } from "express";
import Usuario from "../models/User";
import UserService from "../models/id";
const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { name, lastname, adress, age } = req.body;
  try { 
    const userService = new UserService();
    const newUser = await userService.createUser(name, lastname, adress, age);
    res.status(201).json({ message: "Usuario inserido no sistema" });
  } catch (error) {
    res.status(500).json({ message: "Usuario não inserido", error });
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Usuario.deleteOne({ _id: id });
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

router.patch('/:id', async (req, res) =>{
  const id = req.params.id
  const{name, lastname, adress, age} = req.body;
  const User = {
    name, lastname, adress, age
  };
  try{
    const UpdateUser = await Usuario.updateOne({_id: id}, User);
    res.status(201).json({message:"Usuario atualizado com sucesso!"})
  
  } catch (error) {
    res.status(422).json({ message: "Usario não encontrado" });
  }
});




export default router;
