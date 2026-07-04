import express from "express";
import adminAuth from "../../middlewares/adminAuth.js";
import authRoutes from "./authRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import productRoutes from "./productRoutes.js";
import historyRoutes from "./historyRoutes.js";

const router = express.Router();

// authRoutes duluan & gak pakai adminAuth, soalnya isinya login/logout
router.use("/", authRoutes);

// route di bawah ini baru wajib login
router.use(adminAuth);
router.use("/", dashboardRoutes);
router.use("/", productRoutes);
router.use("/", historyRoutes);

export default router;