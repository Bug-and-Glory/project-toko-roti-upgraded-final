import bcrypt from "bcryptjs";
import User from "../../models/user.js";

const redirectWithMessage = (res, path, message) => {
  return res.redirect(`${path}?message=${encodeURIComponent(message)}`);
};

export const showRegister = (req, res) => {
  res.render("user/register", {
    title: "Register",
    message: req.query.message || "",
  });
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return redirectWithMessage(res, "/register", "Semua field harus diisi!");
    }

    const existingEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return redirectWithMessage(res, "/register", "Email sudah pernah terdaftar!");
    }

    const existingUsername = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return redirectWithMessage(res, "/register", "Username sudah pernah digunakan!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return redirectWithMessage(
      res,
      "/login",
      "Akun berhasil terdaftar. Silakan login."
    );
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return redirectWithMessage(res, "/register", "Terjadi kesalahan saat register.");
  }
};

export const showLogin = (req, res) => {
  res.render("user/login", {
    title: "Login",
    message: req.query.message || "",
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      delete req.session.user;
      return redirectWithMessage(res, "/login", "Email dan password harus diisi!");
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      delete req.session.user;
      return redirectWithMessage(res, "/login", "Email atau password salah!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      delete req.session.user;
      return redirectWithMessage(res, "/login", "Email atau password salah!");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    return req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    delete req.session.user;
    return redirectWithMessage(res, "/login", "Terjadi kesalahan saat login.");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login?message=Logout%20berhasil.");
  });
};