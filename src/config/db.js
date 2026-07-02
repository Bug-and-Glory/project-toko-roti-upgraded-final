import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

try {
  await sequelize.authenticate();
  console.log("Koneksi Database Berhasil...");
} catch (error) {
  console.log("Koneksi Database Gagal : ", error);
}

export default sequelize;
