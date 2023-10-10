import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DBUrl = process.env.DB_URL ?? ""

 export const conectar = () => {
  mongoose.connect(DBUrl)
    .then(() => console.log("MongoDB ONLINE!"))
    .catch((err) => console.log("MongoDB Offline!", err));
};

