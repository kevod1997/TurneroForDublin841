import {Router} from 'express'
import {cancelWorkingDays, createTurn, deleteTurn, getTurns, getTurnsByMonth} from '../controllers/turnos.controllers.js'


const router = Router()

router.get("/turnos", getTurns)
router.get("/turnsByMonth/:year/:month", getTurnsByMonth);

// router.get("/turnos/:id", getTurn)

router.post("/newTurn", createTurn)

router.delete("/turnos/:id", deleteTurn)


// Cancel Working days
router.post("/cancelWorkingDays", cancelWorkingDays)

export default router