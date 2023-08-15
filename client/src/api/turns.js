import axios from "./axios"

export const getTurnsByDate = (date) => axios.get(`/turnos/${date}`)

export const createTurnRequest = (turn) => axios.post("/turnos/newTurn", turn)
