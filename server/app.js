import express from "express";
import turnRoutes from "./routes/turns.routes.js";
import authRoutes from "./routes/auth.routes.js";
import daysRoutes from "./routes/days.routes.js";
import hoursRoutes from "./routes/hours.routes.js";
import cron from "node-cron";
import { deleteExpiredItems } from "./utils/deleteItems.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000", "https://dublin841.shop"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(turnRoutes);
app.use(authRoutes);
app.use(daysRoutes);
app.use(hoursRoutes);

cron.schedule("0 0 * * 0", deleteExpiredItems);

export default app;
