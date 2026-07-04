import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_NAME || process.env.MYSQLDATABASE;
const username = process.env.DB_USER || process.env.MYSQLUSER;
const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
const host = process.env.DB_HOST || process.env.MYSQLHOST;
const port = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Koneksi Database Berhasil...");
} catch (error) {
  console.log("Koneksi Database Gagal:", error);
}

export default sequelize;