import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define(
  "Product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sub_category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    img_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  },
);

export default Product;
