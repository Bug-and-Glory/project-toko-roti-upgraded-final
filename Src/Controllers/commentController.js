import connection from "../config/db.js";

const getAllComments = async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT
        comment_id AS id,
        name,
        email,
        comment,
        created_at
      FROM comments
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const [result] = await connection.execute(
      "DELETE FROM comments WHERE comment_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment tidak ditemukan",
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



const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

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

    const [result] = await connection.execute(
      "UPDATE comments SET comment = ? WHERE comment_id = ?",
      [message, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment tidak ditemukan",
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

export { getAllComments, deleteComment, updateComment };