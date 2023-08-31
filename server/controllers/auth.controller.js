import { TOKEN_SECRET } from "../config.js";
import { creteAccessToken } from "../libs/jwt.js";
import { user } from "../utils/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username !== user.username && password !== user.password) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña incorrectos" });
    }

    if (username !== user.username) {
      return res.status(400).json({ message: "Username incorrecto" });
    }

    if (password !== user.password)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await creteAccessToken({ id: username.id });

    const cookieOptions = {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    };
    
    // Configurar la cookie para el dominio actual
    res.cookie('token', token, { ...cookieOptions, path:'/admin' });
    
    // También podrías considerar configurar la cookie para subdominios si es necesario
    // res.cookie('token', token, { ...cookieOptions, domain: '.example.com' });

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

  const adminUser = user;

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
