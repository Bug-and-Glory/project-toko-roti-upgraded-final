import express from "express";
import * as historyController from "../../controllers/user/historyController.js";

const router = express.Router();

router.get("/history", historyController.showHistoryPage);
router.get("/api/history", historyController.getAllHistory);
router.get("/api/history/:id", historyController.getHistoryById);

export default router;