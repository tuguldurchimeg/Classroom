import { Router } from "express";
import authenticateToken from "../userAuth.mjs";
import {
  getFilteredClasses,
  getSimilarClasses,
  insertClasses,
  insertTimeSlots,
  getTimeSlots,
  getRating,
  insertRating,
  insertReservations,
  getLikedClasses,
  insertLiked,
  getTimes,
  deleteLikedClass,
  getOneRoom,
} from "./controller.mjs";
const router = Router();

router.get(
  "/filtered_classes/:bairfinal/:startTsag/:endTsag/:garag",
  getFilteredClasses
);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.post("/liked", authenticateToken, insertLiked);
router.post("/rating", authenticateToken, insertRating);
router.post("/reservations", authenticateToken, insertReservations);

router.get("/time_slots", getTimeSlots);
router.get("/times/:room_id/:week/:garag", getTimes);
router.get("/classes/:room_id/:build", getSimilarClasses);
router.get("/rating/:room_id", getRating);
router.get("/classes/:room_id", getOneRoom);
router.get("/liked", authenticateToken, getLikedClasses);
router.put("/liked", authenticateToken, deleteLikedClass);

export default router;
