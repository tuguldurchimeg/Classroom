import { Router } from "express";
import {
  getFilteredClasses,
  getClasses,
  insertClasses,
  insertTimeSlots,
  getTimeSlots,
  getRating,
  insertRating,
  insertReservations,
} from "./controller.mjs";
const router = Router();

router.get(
  "/filtered_classes/:bairfinal/:startTsag/:endTsag/:garag",
  getFilteredClasses
);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.get("/time_slots", getTimeSlots);
router.get("/classes", getClasses);
router.get("/rating/:room_id", getRating);
router.post("/rating", insertRating);
router.post("/reservations", insertReservations);

export default router;
