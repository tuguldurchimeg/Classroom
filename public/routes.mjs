import { Router } from "express";
import {
  getFilteredClasses,
  getClasses,
  insertClasses,
  insertTimeSlots,
  getTimeSlots,
} from "./controller.mjs";
const router = Router();

router.get("/filtered_classes", getFilteredClasses);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.get("/time_slots", getTimeSlots);
router.get("/classes", getClasses);

export default router;
