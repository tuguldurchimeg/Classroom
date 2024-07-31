import express from "express";
import authenticateToken from "../userAuth.mjs";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "./users_controller.mjs";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getUserProfile);

export default router;
