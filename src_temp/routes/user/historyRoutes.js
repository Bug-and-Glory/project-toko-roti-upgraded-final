import express from "express";
import * as historyController from "../../controllers/user/historyController.js";
import { isLoggedIn } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/history", isLoggedIn, historyController.getAllHistory);

export default router;