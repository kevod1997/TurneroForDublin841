import express from 'express'
import turnRoutes from './routes/turns.routes.js'
import authRoutes from './routes/auth.routes.js'
import cron from 'node-cron'
import { deleteExpiredItems } from './utils/deleteItems.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())

app.use(turnRoutes)
app.use(authRoutes)

cron.schedule("0 0 * * 0", deleteExpiredItems);

export default app