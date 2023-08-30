import { TOKEN_SECRET } from "../config.js";
import { creteAccessToken } from "../libs/jwt.js";
import { user } from "../utils/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if(username !== user.username && password !== user.password){
        return res.status(400).json({ message: "Usuario y contraseña incorrectos" });
      }

      if(username !== user.username){
        return res.status(400).json({ message: "Username incorrecto" });
      }
  
      if (password !== user.password)
        return res.status(400).json({ message: "Contraseña incorrecta" });
  
      const token = await creteAccessToken({ id: username.id });
  
      res.cookie("token", token, { sameSite: 'none', secure: true, domain: "dublin841-nrev-dev.fl0.io" });
      res.json({
        id: user.id,
        username: user.username,
      });
      console.log(token);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const logout = (req, res) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };
  
  export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    const adminUser = user
  
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
  
      if (!adminUser.id) return res.status(401).json({ message: "Unauthorized" });
  
      return res.json({
        id: adminUser.id,
        username: adminUser.username,
      });
    });
  };