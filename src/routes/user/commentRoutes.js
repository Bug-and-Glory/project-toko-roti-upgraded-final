import express from "express";
import * as commentController from "../../controllers/user/commentController.js";
import { isLoggedIn } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Menampilkan form komentar
router.get("/comment", isLoggedIn, commentController.showCommentForm);

// Menyimpan komentar
router.post("/comment", isLoggedIn, commentController.createComment);

// Menampilkan semua komentar
router.get("/showComments", commentController.showComments);

// Menampilkan form edit komentar
router.get("/comment/:id/edit", isLoggedIn, commentController.showEditComment);

// Menyimpan perubahan komentar
router.post("/comment/:id/edit", isLoggedIn, commentController.updateComment);

// Menghapus komentar
router.post("/comment/:id/delete", isLoggedIn, commentController.deleteComment);

export default router;