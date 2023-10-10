import express, { Request, Response } from "express";
import Usuario from "../models/User";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, lastname, adress, age } = req.body;
  const user = {
    name,
    lastname,
    adress,
    age,
  };

  try {
    await Usuario.create(user);
    res.status(201).json({ message: "Usuario inserido no sistema" });
  } catch (error) {
    res.status(500).json({ message:"Usuario não inserido", error});
  }
});

export default router;
