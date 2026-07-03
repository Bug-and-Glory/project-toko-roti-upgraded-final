import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";

// Import Admin Routes
import adminRoutes from "./routes/admin/index.js";

// Import User Routes
import userRoutes from "./routes/user/index.js";

// Import Middleware
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
  })
);

// Kirim data user login ke semua halaman EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// Error Handler
app.use(errorHandler);

export default app;