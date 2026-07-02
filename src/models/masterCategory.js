import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const MasterCategory = sequelize.define(
  "MasterCategory",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },},
  {
    tableName: "master_categories",
  },
);

export default MasterCategory;
