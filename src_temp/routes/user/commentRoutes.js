import express from "express";
import * as commentController from "../../controllers/user/commentController.js";
import { isLoggedIn } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Menampilkan form komentar
router.get("/comment", isLoggedIn, commentController.showCommentForm);

// Menyimpan komentar baru
router.post("/comment", isLoggedIn, commentController.createComment);

// Menampilkan semua komentar
router.get("/showComments", commentController.showComments);

// Mengubah komentar milik user yang login
router.post("/comment/:id/edit", isLoggedIn, commentController.updateComment);

// Menghapus komentar milik user yang login
router.post("/comment/:id/delete", isLoggedIn, commentController.deleteComment);

export default router;