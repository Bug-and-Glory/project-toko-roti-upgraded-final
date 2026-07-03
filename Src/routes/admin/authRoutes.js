import express from "express";
import * as adminAuthController from "../../controllers/admin/adminAuthController.js";

const router = express.Router();

router.get("/login", adminAuthController.showLogin);
router.post("/login", adminAuthController.login);
router.get("/logout", adminAuthController.logout);

export default router;