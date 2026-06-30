import express from "express";
import createComments from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createComments);

export default router;  