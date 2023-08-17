import { Router } from "express";
import { cancelHours, deleteCancelledHours, deleteCancelledHoursById, getAvailableHours, getCancelledHours, getCancelledHoursByWeek, updateCancelledHours } from '../controllers/hours.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

//Cancel hours
router.get("/admin/cancelHours/:week", authRequired, getCancelledHoursByWeek)
router.get("/admin/availableHours/:date", authRequired, getAvailableHours)
router.get("/admin/cancelHours", authRequired, getCancelledHours)
router.post("/admin/cancelHours", authRequired, cancelHours)
router.delete("/admin/cancelHours", authRequired, deleteCancelledHours)
router.delete("/admin/cancelHours/:id", authRequired, deleteCancelledHoursById)
router.put("/admin/cancelHours/:id", authRequired, updateCancelledHours)

export default router;
