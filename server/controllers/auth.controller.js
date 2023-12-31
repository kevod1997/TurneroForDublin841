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

    res.cookie("token", token, {
      domain: ".dublin841-nrev-dev.fl0.io",
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    res.json({
      id: user.id,
      username: user.username,
      token: token,
    });
    console.log(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    domain: ".dublin841-nrev-dev.fl0.io", // Usar el mismo dominio
    expires: new Date(0),
    secure: true, // Debe coincidir con la configuración de la cookie
    httpOnly: true, // Debe coincidir con la configuración de la cookie
    sameSite: "none", // Debe coincidir con la configuración de la cookie
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies;

  const adminUser = user;
  console.log(token);
  if (!token)
    return res.status(401).json({ message: "Unauthorized by lack of token" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    console.log(user);
    console.log(err);
    if (err) return res.status(401).json({ message: "Error: Unauthorized" });

    if (!adminUser.id)
      return res
        .status(401)
        .json({ message: "Error: Unauthorized by lack of user" });

    return res.json({
      id: adminUser.id,
      username: adminUser.username,
    });
  });
};
