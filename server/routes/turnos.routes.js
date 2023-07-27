import {Router} from 'express'
import {createTurn} from '../controllers/turnos.controllers.js'

const router = Router()

// router.get("/turnos", getTurns)

// router.get("/turnos/:id", getTurn)

router.post("/newTurn", createTurn)

// router.delete("/turnos/:id", deleteTurn)

export default router