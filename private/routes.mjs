import express from "express";
import authenticateToken from "../userAuth.mjs";
import {
  registerUser,
  loginUser,
  getUserProfile,
  changeUserPassword,
} from "./users_controller.mjs";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/change-password", authenticateToken, changeUserPassword);

export default router;
