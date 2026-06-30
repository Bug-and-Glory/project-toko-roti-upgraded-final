import express from "express";
import {
  getAllProducts,
  getProductById,
  searchProductByName,
  getProductDetail,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProductByName);
router.get("/:id", getProductById);
router.get("/:id/detail", getProductDetail);

export default router;