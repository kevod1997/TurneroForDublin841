import {Router} from 'express'
import { createTurn, deleteTurn, getTurn, getTurnsByDay, getTurnsByWeek, turnsForPickDay } from '../controllers/turns.controllers.js'
import { cancelWorkingDays, deleteCancelledDayById, deleteCancelledDays, getCancelledWorkingDays } from '../controllers/days.controllers.js';
import { cancelHours, deleteCancelledHours, deleteCancelledHoursById, getCancelledHours, getCancelledHoursByWeek, updateCancelledHours } from '../controllers/hours.controllers.js';
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

// Cancel Working days
router.get("/cancelWorkingDays", authRequired, getCancelledWorkingDays)
router.post("/cancelWorkingDays", authRequired, cancelWorkingDays)
router.delete("/cancelWorkingDay/:id", authRequired, deleteCancelledDayById)
router.delete("/cancelWorkingDays", authRequired, deleteCancelledDays)

//Cancel hours
router.get("/cancelHours/:week", authRequired, getCancelledHoursByWeek)
router.get("/cancelHours", authRequired, getCancelledHours)
router.post("/cancelHours", authRequired, cancelHours)
router.delete("/cancelHours", authRequired, deleteCancelledHours)
router.delete("/cancelHours/:id", authRequired, deleteCancelledHoursById)
router.put("/cancelHours/:id", authRequired, updateCancelledHours)

export default router