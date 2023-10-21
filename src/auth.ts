const jwt = require("jsonwebtoken");

const secretKey = "key_test";
const data = {
    userId: 2002,
    username:"guireg",
    role: 'Adm'
}

function generateToken(data: { id: number; username: string;}) {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
}

const userData = { id: 123, username: "usertest" };
const token = generateToken(userData);
console.log("Token:", token);
