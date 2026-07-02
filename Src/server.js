import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server berjalan di PORT ${port}`);
});
