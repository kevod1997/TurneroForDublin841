import {Router} from 'express'
import { createTurn, deleteTurn, getTurn, getTurnsByDay, getTurnsByWeek, } from '../controllers/turnos.controllers.js'
import { cancelWorkingDays, deleteCancelledDayById, deleteCancelledDays } from '../controllers/cancelDays.js';
import { cancelHours, deleteCancelledHours, deleteCancelledHoursById, updateCancelledHours } from '../controllers/cancelHours.js';

const router = Router()

// Turnos
router.get("/turnos/:id", getTurn)
router.get("/turnos/:day", getTurnsByDay)
router.get("/turnos/semana/:week", getTurnsByWeek)
router.post("/turnos/newTurn", createTurn) //user & admin
router.delete("/turnos/delete/:id", deleteTurn)

// Cancel Working days
//ruta para que el admin pueda ver los dias que cancelo
router.post("/cancelWorkingDays", cancelWorkingDays)
router.delete("/cancelWorkingDay/:id", deleteCancelledDayById)
router.delete("/cancelWorkingDays", deleteCancelledDays)

//Cancel hours
//ruta para que el admin pueda ver las horas que cancelo
router.post("/cancelHours", cancelHours)
router.delete("/cancelHours", deleteCancelledHours)
router.delete("/cancelHours/:id", deleteCancelledHoursById)
router.put("/cancelHours/:id", updateCancelledHours)

export default router