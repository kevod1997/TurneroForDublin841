import dotenv from "dotenv";
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/turnos"
export const PORT = process.env.PORT || 4000
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const USER_USERNAME = process.env.USER_USERNAME
export const USER_PASSWORD = process.env.USER_PASSWORD