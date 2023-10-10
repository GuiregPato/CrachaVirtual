import mongoose, { Schema } from "mongoose";
import { StringLiteral } from "typescript";

interface CUser {
  name: string;
  lastname: string;
  adress: String;
  age: number;
}

const usuarioSchema = new Schema<CUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  adress: { type: String, required: true },
  age:{type: Number, required: true}
});

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default  Usuario