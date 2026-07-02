import express from "express";
import * as commentController from "../../controllers/user/commentController.js";

const router = express.Router();

// Menampilkan semua komentar
router.get("/comment", commentController.getAllComments);

// Menambahkan komentar
router.post("/comment", commentController.createComment);

// Mengubah komentar
router.put("/comment/:id", commentController.updateComment);

// Menghapus komentar
router.delete("/comment/:id", commentController.deleteComment);

export default router;