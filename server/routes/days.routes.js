import { Router } from "express";
import { cancelWorkingDays, deleteCancelledDayById, deleteCancelledDays, getCancelledWorkingDays } from '../controllers/days.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Cancel Working days
router.get("/admin/cancelWorkingDays", authRequired, getCancelledWorkingDays)
router.post("/admin/cancelWorkingDays", authRequired, cancelWorkingDays)
router.delete("/cancelWorkingDay/:id", authRequired, deleteCancelledDayById)
router.delete("/admin/cancelWorkingDays", authRequired, deleteCancelledDays)

export default router;