import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

// Socket.io butuh HTTP server manual, gak bisa langsung nempel di express app
const server = http.createServer(app);
const io = new Server(server);

// Simpan io di app.locals biar bisa diakses dari controller lewat req.app.locals.io
app.locals.io = io;

io.on("connection", (socket) => {
  console.log("User terkoneksi ke socket:", socket.id);

  socket.on("disconnect", () => {
    console.log("User terputus dari socket:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server berjalan di PORT ${port}`);
});