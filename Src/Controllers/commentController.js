import Comment from "../models/comment.js";

const getAllComments = async (req, res) => {
  try {
    // Ambil semua comment, terbaru duluan
    const rows = await Comment.findAll({
      attributes: [["comment_id", "id"], "user_id", "name", "email", "comment", "created_at"],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const user_id = req.user.id; // user yang lagi login

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Komentar tidak boleh kosong",
      });
    }

    // Cuma boleh update comment milik sendiri
    const [affectedCount] = await Comment.update(
      { comment: message },
      { where: { comment_id: id, user_id } }
    );

    if (affectedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment tidak ditemukan atau bukan milikmu",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment berhasil diupdate",
      data: {
        id,
        message,
      },
    });
  } catch (err) {
    console.error("ERROR UPDATE:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // user yang lagi login

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    // Cuma boleh hapus comment milik sendiri
    const deletedCount = await Comment.destroy({
      where: { comment_id: id, user_id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment tidak ditemukan atau bukan milikmu",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { getAllComments, updateComment, deleteComment };