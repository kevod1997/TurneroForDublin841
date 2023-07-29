import {Router} from 'express'
import {createTurn, deleteTurn, getTurns, getTurnsByMonth} from '../controllers/turnos.controllers.js'
// import getMonthAndYear from '../middlewares/getMonthAndYear.js'

const router = Router()

router.get("/turnos", getTurns)
router.get("/turnsByMonth/:year/:month", getTurnsByMonth);

// router.get("/turnos/:id", getTurn)

router.post("/newTurn", createTurn)

router.delete("/turnos/:id", deleteTurn)

export default router