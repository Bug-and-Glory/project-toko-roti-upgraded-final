import express from "express";
import * as authController from "../../controllers/user/authController.js";
import { isGuest } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/register", isGuest, authController.showRegister);
router.post("/register", isGuest, authController.register);

router.get("/login", isGuest, authController.showLogin);
router.post("/login", isGuest, authController.login);

router.get("/logout", authController.logout);

export default router;