import { connectDb } from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js";
import http from "http";
// import { Server as SocketServer } from "socket.io";
// import socketHandler from "./libs/socketHandler.js";

const httpServer = http.createServer(app);
// const io = new SocketServer(httpServer, {
//   cors: {
//     origin: "http://localhost:3000", // Cambia esto a la URL de tu aplicación React
//     methods: ["GET", "POST", "WebSocket"],
//   },
// });

// socketHandler(io);
connectDb();
httpServer.listen(PORT);
console.log("server in port", PORT);
