import express from "express";
import * as orderController from "../../controllers/user/orderController.js";
import { isLoggedIn } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/cart", isLoggedIn, orderController.showCart);
router.post("/order", isLoggedIn, orderController.createOrder);

export default router;
