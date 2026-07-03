import Admin from "../../models/admin.js";

// Tampilkan halaman login admin
export const showLogin = (req, res) => {
  const message = req.session.message || "";
  req.session.message = "";

  res.render("admin/admin-login", {
    title: "Admin Login",
    message,
  });
};

// Proses login admin, cek username & password (plain text, sesuai data di DB)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.session.message = "Semua field harus diisi!";
      return res.redirect("/admin/login");
    }

    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      req.session.message = "Username atau password salah!";
      return res.redirect("/admin/login");
    }

    if (admin.password !== password) {
      req.session.message = "Username atau password salah!";
      return res.redirect("/admin/login");
    }

    req.session.admin = {
      id: admin.id,
      name: admin.name,
      username: admin.username,
    };

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    req.session.message = "Terjadi kesalahan saat login.";
    res.redirect("/admin/login");
  }
};

// Logout admin, hapus session
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};