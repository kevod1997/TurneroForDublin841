import {Router} from 'express'
import { createTurn, deleteTurn, getTurn, getTurnsByDay, getTurnsByWeek, } from '../controllers/turnos.controllers.js'
import { cancelWorkingDays, deleteCancelledDays } from '../controllers/cancelDays.js';
import { cancelHours, deleteCancelledHours, updateCancelledHours } from '../controllers/cancelHours.js';

const router = Router()

// Turnos
router.get("/turnos/:id", getTurn)
router.get("/turnos/:day", getTurnsByDay)
router.get("/turnos/semana/:week", getTurnsByWeek)
router.post("/turnos/newTurn", createTurn)
router.delete("/turnos/delete/:id", deleteTurn)

// Cancel Working days
router.post("/cancelWorkingDays", cancelWorkingDays)
router.delete("/cancelWorkingDays", deleteCancelledDays)

//Cancel hours
router.post("/cancelHours", cancelHours)
router.delete("/cancelHours", deleteCancelledHours)
router.put("/cancelHours/:id", updateCancelledHours)

export default router