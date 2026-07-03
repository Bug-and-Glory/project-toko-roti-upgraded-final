// Cek apakah admin sudah login (ada session), kalau belum kita tendang dan campakkan ke halaman login
const adminAuth = (req, res, next) => {
  if (!req.session.admin) {
    return res.redirect("/admin/login");
  }
  next();
};

export default adminAuth;