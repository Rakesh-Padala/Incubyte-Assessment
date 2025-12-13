import express from "express";
import {
  createSweet,
  listSweets,
  searchSweets,
  purchaseSweet,
} from "../controllers/sweet.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ SEARCH MUST COME FIRST
router.get("/search", searchSweets);

// List sweets
router.get("/", protect, listSweets);

// Create sweet (admin)
router.post("/", protect, adminOnly, createSweet);

// Purchase sweet
router.post("/:id/purchase", protect, purchaseSweet);

export default router;
