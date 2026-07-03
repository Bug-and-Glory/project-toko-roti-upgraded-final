import express from "express";
import * as adminMenuController from "../../controllers/admin/adminMenuController.js";

const router = express.Router();

router.get("/lihat-menu", adminMenuController.getLihatMenu);
router.get("/kelola-menu", adminMenuController.getKelolaMenu);
router.post("/kelola-menu/add", adminMenuController.addMenu);

export default router;