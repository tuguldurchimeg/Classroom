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
} from "./controller.mjs";
const router = Router();

router.get(
  "/filtered_classes/:bairfinal/:startTsag/:endTsag/:garag",
  getFilteredClasses
);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.get("/time_slots", getTimeSlots);
router.get("/classes/:room_id/:build", getSimClasses);
router.get("/rating/:room_id", getRating);
router.post("/rating", insertRating);
router.post("/reservations", insertReservations);
router.get("/liked/:user_id", getLikedClasses);
router.post("/liked", insertLiked);

export default router;
