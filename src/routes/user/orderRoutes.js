import express from "express";
import * as orderController from "../../controllers/user/orderController.js";

const router = express.Router();

router.get("/cart", orderController.showCart);
router.post("/order", orderController.createOrder);


export default router;
