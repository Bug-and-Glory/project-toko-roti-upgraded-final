import express from "express";
import * as contactController from "../../controllers/user/contactController.js";

const router = express.Router();

router.get("/contact", contactController.showContact);

router.post("/contact", contactController.sendMessage);

export default router;