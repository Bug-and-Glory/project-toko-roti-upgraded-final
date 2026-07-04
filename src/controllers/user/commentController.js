import { Comment, User } from "../../models/index.js";

const redirectWithMessage = (res, path, message) => {
  return res.redirect(`${path}?message=${encodeURIComponent(message)}`);
};

// Render halaman form komentar
export const showCommentForm = (req, res) => {
  res.render("user/commentForm", {
    title: "Comment",
    message: req.query.message || "",
  });
};

// Simpan komentar baru
export const createComment = async (req, res, next) => {
  try {
    const { comment } = req.body;

    const userId = req.session.user.id;
    const name = req.session.user.name || req.session.user.username;
    const email = req.session.user.email;

    if (!comment || comment.trim() === "") {
      return redirectWithMessage(res, "/comment", "Komentar tidak boleh kosong.");
    }

    await Comment.create({
      user_id: userId,
      name,
      email,
      comment: comment.trim(),
    });

    return redirectWithMessage(
      res,
      "/showComments",
      "Komentar berhasil dikirim."
    );
  } catch (error) {
    console.log("CREATE COMMENT ERROR:", error);
    next(error);
  }
};

// Render halaman semua komentar
export const showComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: "Comment_User",
          attributes: ["id", "name", "username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.render("user/commentPage", {
      title: "Comments",
      comments,
      message: req.query.message || "",
    });
  } catch (error) {
    console.log("SHOW COMMENTS ERROR:", error);
    next(error);
  }
};

// Update komentar milik user yang login
export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.session.user.id;

    if (!comment || comment.trim() === "") {
      return redirectWithMessage(
        res,
        "/showComments",
        "Komentar tidak boleh kosong."
      );
    }

    const existingComment = await Comment.findByPk(id);

    if (Number(existingComment.user_id) !== Number(userId)) {
  return redirectWithMessage(
    res,
    "/showComments",
    "Kamu hanya bisa mengedit komentar milikmu sendiri."
  );
}

   if (Number(existingComment.user_id) !== Number(userId)) {
  return redirectWithMessage(
    res,
    "/showComments",
    "Kamu hanya bisa menghapus komentar milikmu sendiri."
  );
}

    await existingComment.update({
      comment: comment.trim(),
    });

    return redirectWithMessage(
      res,
      "/showComments",
      "Komentar berhasil diperbarui."
    );
  } catch (error) {
    console.log("UPDATE COMMENT ERROR:", error);
    next(error);
  }
};

// Hapus komentar milik user yang login
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;

    const existingComment = await Comment.findByPk(id);

    if (!existingComment) {
      return redirectWithMessage(
        res,
        "/showComments",
        "Komentar tidak ditemukan."
      );
    }

    if (existingComment.user_id !== userId) {
      return redirectWithMessage(
        res,
        "/showComments",
        "Kamu hanya bisa menghapus komentar milikmu sendiri."
      );
    }

    await existingComment.destroy();

    return redirectWithMessage(
      res,
      "/showComments",
      "Komentar berhasil dihapus."
    );
  } catch (error) {
    console.log("DELETE COMMENT ERROR:", error);
    next(error);
  }
};