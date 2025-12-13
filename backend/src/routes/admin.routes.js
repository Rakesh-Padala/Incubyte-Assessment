import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();
router.get("/", protect, adminOnly, (req, res) => {
  res.status(200).json({ message: "Admin access granted" });
});


export default router;
