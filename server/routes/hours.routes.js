import { Router } from "express";
import { cancelHours, deleteCancelledHours, deleteCancelledHoursById, getCancelledHours, getCancelledHoursByWeek, updateCancelledHours } from '../controllers/hours.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

//Cancel hours
router.get("/cancelHours/:week", authRequired, getCancelledHoursByWeek)
router.get("/cancelHours", authRequired, getCancelledHours)
router.post("/cancelHours", authRequired, cancelHours)
router.delete("/cancelHours", authRequired, deleteCancelledHours)
router.delete("/cancelHours/:id", authRequired, deleteCancelledHoursById)
router.put("/cancelHours/:id", authRequired, updateCancelledHours)

export default router;
