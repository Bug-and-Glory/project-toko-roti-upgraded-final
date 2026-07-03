import express from "express";
import * as adminHistoryController from "../../controllers/admin/adminHistoryController.js";

const router = express.Router();

router.get("/history-admin", adminHistoryController.getHistoryAdmin);

export default router;