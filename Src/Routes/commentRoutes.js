import express from "express";
import { getAllComments, deleteComment, updateComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getAllComments);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

export default router;