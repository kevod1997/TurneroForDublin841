import {Router} from 'express'
import { createTurn, deleteTurn, getTurn, getTurnsByDay, getTurnsByWeek, turnsForPickDay } from '../controllers/turns.controllers.js'
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { createTurnSchema } from '../schema/turn.schema.js';

const router = Router()

// Turnos
router.get("/turnos/:date", turnsForPickDay)
router.get("/admin/turnos/:date",authRequired, getTurnsByDay)
router.get("/turnos/:id", authRequired, getTurn)
router.get("/turnos/semana/:week", authRequired, getTurnsByWeek)
router.post("/turnos/newTurn", validateSchema(createTurnSchema), createTurn) //user & admin
router.delete("/admin/turnos/:id", authRequired, deleteTurn)


export default router