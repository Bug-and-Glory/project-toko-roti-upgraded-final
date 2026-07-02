import express from "express";
import * as menuController from "../../controllers/user/menuController.js";

const router = express.Router();

router.get("/menu", menuController.getAllProducts);

router.get("/menu/search", menuController.searchProductByName);

router.get("/menu/:id", menuController.getProductById);

export default router;