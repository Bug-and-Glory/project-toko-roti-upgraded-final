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

export default app;
