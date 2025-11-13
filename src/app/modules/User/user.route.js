import express from "express";

const router = express.Router();
import {
  getProfile,
  login,
  register,
  updateProfile,
} from "./user.controller.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", getProfile);
router.put("/update/:id", updateProfile);

export const UserRoutes = router;
