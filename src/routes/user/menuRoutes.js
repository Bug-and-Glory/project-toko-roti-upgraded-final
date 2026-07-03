import express from "express";
import * as menuController from "../../controllers/user/menuController.js";
import { isLoggedIn } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/menu", menuController.getAllProducts);

router.get("/menu/:id", isLoggedIn, menuController.getProductById);

export default router;