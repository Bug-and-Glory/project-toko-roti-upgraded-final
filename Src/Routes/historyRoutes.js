import { Router } from "express";
import { getAllHistory, getHistoryById } from "../controllers/historyController.js";

const router = Router();

// GET /api/history 
router.get("/", getAllHistory);

// GET /api/history/:id 
router.get("/:id", getHistoryById);

export default router;