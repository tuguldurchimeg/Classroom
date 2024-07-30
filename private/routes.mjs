import express from "express";
import userAuth from "../middleware/userAuth.mjs";
import { signup, login } from "./users_controller.mjs";

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

export default router;
