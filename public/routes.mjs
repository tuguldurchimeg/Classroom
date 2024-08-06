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
  getLikedClass,
  getRecommendedClasses,
  getReservations,
  cancelReservation,
} from "./controller.mjs";
const router = Router();

router.get(
  "/filtered_classes/:bairfinal/:startTsag/:endTsag/:garag",
  getFilteredClasses
);
router.post("/classes", insertClasses);
router.post("/time_slots", insertTimeSlots);
router.post("/rating", authenticateToken, insertRating);

router.get("/time_slots", getTimeSlots);
router.get("/times/:room_id/:date", getTimes);

router.post("/reservations", authenticateToken, insertReservations);
router.get("/reservations", authenticateToken, getReservations);
router.put("/reservations/:res_id", authenticateToken, cancelReservation);

router.get("/classes/:room_id/:build", getSimilarClasses);
router.get("/classes/:room_id", getOneRoom);
router.get("/recommended", getRecommendedClasses);
router.get("/rating/:room_id", getRating);

router.post("/liked", authenticateToken, insertLiked);
router.get("/liked", authenticateToken, getLikedClasses);
router.get("/liked/:room_id", authenticateToken, getLikedClass);
router.put("/liked", authenticateToken, deleteLikedClass);

export default router;
