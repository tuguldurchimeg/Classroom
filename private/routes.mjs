import { Router } from "express";
import path from "path";
import { logout, authenticate, register } from "./controller.mjs";
const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../index.html"));
});

router.get("/index", (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname + "../index.html"));
  } else {
    const errorMessage = "You must login to see this page";
    res.send(
      `<script>alert('${errorMessage}'); window.location.href='/';</script>`
    );
  }
});

router.post("/auth", authenticate);
router.post("/authreg", register);
router.post("/logout", logout);

export default router;
