import express from "express";

import authRoutes from "./authRoutes.js";
import homeRoutes from "./homeRoutes.js";
import menuRoutes from "./menuRoutes.js";
import orderRoutes from "./orderRoutes.js";
import historyRoutes from "./historyRoutes.js";
import contactRoutes from "./contactRoutes.js";
import commentRoutes from "./commentRoutes.js";
import aboutRoutes from "./aboutRoutes.js";
import storeRoutes from "./storeRoutes.js";

const router = express.Router();

router.use("/", authRoutes);
router.use("/", homeRoutes);
router.use("/", menuRoutes);
router.use("/", orderRoutes);
router.use("/", historyRoutes);
router.use("/", contactRoutes);
router.use("/", commentRoutes);
router.use("/", aboutRoutes);
router.use("/", storeRoutes);

export default router;