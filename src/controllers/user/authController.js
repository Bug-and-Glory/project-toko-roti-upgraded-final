import bcrypt from "bcryptjs";
import User from "../../models/user.js";

export const showRegister = (req, res) => {
  const message = req.session.message || "";
  req.session.message = "";

  res.render("user/register", {
    title: "Register",
    message,
  });
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      req.session.message = "Semua field harus diisi!";
      return res.redirect("/register");
    }

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      req.session.message = "Email sudah pernah terdaftar!";
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    req.session.message = "Akun berhasil terdaftar!";
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.session.message = "Terjadi kesalahan saat register.";
    res.redirect("/register");
  }
};

export const showLogin = (req, res) => {
  const message = req.session.message || "";
  req.session.message = "";

  res.render("user/login", {
    title: "Login",
    message,
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.message = "Semua field harus diisi!";
      return res.redirect("/login");
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.session.message = "Email atau password salah!";
      return res.redirect("/login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      req.session.message = "Email atau password salah!";
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.session.message = "Terjadi kesalahan saat login.";
    res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};