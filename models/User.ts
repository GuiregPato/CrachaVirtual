import { Schema, model, Document } from 'mongoose';

interface User {
  name: string;
  lastname: string;
  adress: string;
  age: number;
}
export interface Userdocment  extends User {}
const usuarioSchema = new Schema<Userdocment>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  adress: { type: String, required: true },
  age:{type: Number, required: true}
});



const Usuario = model<Userdocment>('User', usuarioSchema)

export default  Usuario

  