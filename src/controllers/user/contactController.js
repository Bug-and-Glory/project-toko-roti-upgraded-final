// import Comment from "../../models/comment.js";

// // Dipanggil dari halaman contact us. User harus sudah login (lewat middleware auth),
// // jadi name & email diambil dari req.user, Bbukan dari input form.
// const createComment = async (req, res) => {
//   try {
//     const { id: user_id, name, email } = req.user; // sesuaikan kalau fieldnya nntis beda
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Komentar tidak boleh kosong",
//       });
//     }

//     const newComment = await Comment.create({
//       user_id,
//       name,
//       email,
//       comment: message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Comment berhasil dikirim",
//       data: newComment,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export default createComment;

import Comment from "../../models/comment.js";

export const showContact = async (req, res, next) => {
  try {
    res.render("user/commentPage", {
      title: "CommentPage",
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: user_id, name, email } = req.user || {};
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Komentar tidak boleh kosong",
      });
    }

    const newComment = await Comment.create({
      user_id,
      name,
      email,
      comment: message,
    });

    res.status(201).json({
      success: true,
      message: "Comment berhasil dikirim",
      data: newComment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};