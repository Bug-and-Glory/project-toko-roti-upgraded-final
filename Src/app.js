import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import Session
import session from "express-session";

// Import Admin Routes
import adminRoutes from "./routes/admin/index.js";

// Import User Routes
import userRoutes from "./routes/user/index.js";

// Import MidlleWare
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();



// View Engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2,
    },
  }),
);

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// // 404
// app.use((req, res) => {
//   res.status(404).render("404", {
//     title: "404 Not Found",
//   });
// });


const admin = {
    name: "Admin Bakery"
};

const menuList = [
    {
        id: 1,
        name: "Croissant Butter",
        category: "Pastry",
        price: "25000",
        status: "Tersedia",
        image: "/images/croissant.jpg"
    },
    {
        id: 2,
        name: "Chocolate Donut",
        category: "Roti",
        price: "18000",
        status: "Tersedia",
        image: "/images/donut.jpg"
    },
    {
        id: 3,
        name: "Cappuccino",
        category: "Coffee",
        price: "22000",
        status: "Habis",
        image: "/images/coffee.jpg"
    }
];

app.get("/admin/login", (req, res) => {
    res.render("admin-login", {
        title: "Admin Login"
    });
});

app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    if (
        email === "admin@yumyum.com" &&
        password === "admin123"
    ) {
        return res.redirect("/admin/dashboard");
    }{
        return res.redirect("/admin/lihat-menu");
    }{
        return res.redirect("/admin/kelola-menu");
    }{
        return res.redirect("/admin/history-admin");
    }

    res.redirect("/admin/login");
});

app.get("/admin", (req, res) => {
    res.redirect("/admin/login");
});

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Masuk"
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
});

app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Daftar"
    });
});

app.post("/signup", (req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body;
});

app.get("/about_us", (req, res) => {
    res.render("about_us", {
        pageTitle: "About Us — YumYum Bakery"
    });
});

app.get("/comment", (req, res) => {
    res.render("comment", {
        pageTitle: "Komentar — YumYum Bakery"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        pageTitle: "Contact Us - YumYum Bakery"
    });
});

app.get("/menu", (req, res) => {
    res.render("menu", {
        pageTitle: "Menu — YumYum Bakery"
    });
});

app.get("/privacy", (req, res) => {
    res.render("privacy", {
        pageTitle: "Privacy Policy - YumYum Bakery"
    });
});

app.get("/admin/dashboard", (req, res) => {
    res.render("dashboard", {
        admin,
        totalMenu: menuList.length,
        totalOrder: 245,
        totalRevenue: "24.500.000",
        totalHistory: 580
    });
});

app.get("/admin/lihat-menu", (req, res) => {
    res.render("lihat-menu", {
        menuList
    });
});

app.get("/admin/kelola-menu", (req, res) => {
    res.render("kelola-menu", {
        menuList
    });
});

app.get("/admin/history-admin", (req, res) => {
    res.render("history-admin");
});

export default app;
