import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

export default router;
