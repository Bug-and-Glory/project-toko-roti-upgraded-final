import express from "express";
import * as adminController from "../../controllers/admin/adminController.js";

const router = express.Router();

router.get("/dashboard", adminController.getDashboard);

export default router;