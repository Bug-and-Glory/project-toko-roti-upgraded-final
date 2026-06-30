import connection from "../config/db.js";

export const createComments = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap"
      });
    }

    // Insert ke database
    const [result] = await connection.execute(
      "INSERT INTO comments (name, email, comment) VALUES (?, ?, ?)",
      [name, email, message]
    );

    // Response ke frontend
    return res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim",
      data: {
        id: result.insertId,
        name,
        email,
        message
      }
    });

  } catch (error) {
    console.error("ERROR CREATE COMMENT:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server"
    });
  }
};



export default createComments;