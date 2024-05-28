import { Router } from "express";
import {
  getFilteredClasses,
  getSimClasses,
  insertClasses,
  insertTimeSlots,
  getTimeSlots,
  getRating,
  insertRating,
  insertReservations,
  getLikedClasses,
  insertLiked,
  getTimes,
} from "./controller.mjs";
const router = Router();

router.get(
  "/filtered_classes/:bairfinal/:startTsag/:endTsag/:garag",
  getFilteredClasses
);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.post("/liked", insertLiked);
router.post("/rating", insertRating);
router.post("/reservations", insertReservations);

router.get("/time_slots", getTimeSlots);
router.get("/classes/:room_id/:build", getSimClasses);
router.get("/rating/:room_id", getRating);
router.get("/liked/:user_id", getLikedClasses);
router.get("/times/:room_id/:week/:garag", getTimes);

export default router;
