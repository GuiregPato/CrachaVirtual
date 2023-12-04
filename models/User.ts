import { Schema, model, Document } from 'mongoose';

interface User {
  name: string;
  lastname: string;
  address: string;
  age: number;
  email: string;
  password: string;
}
interface Userdocment  extends User, Document {}
const usuarioSchema = new Schema<Userdocment>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  age:{type: Number, required: true},
  email:{type: String, required: true},
  password:{type: String, required: true}

});

const Usuario = model<Userdocment>('User', usuarioSchema)

export default  Usuario