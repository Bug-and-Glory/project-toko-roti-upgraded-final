import express from "express";
import * as historyController from "../../controllers/user/historyController.js";

const router = express.Router();

router.get("/history", historyController.showHistoryPage);

export default router;