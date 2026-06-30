import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ProductDetail = sequelize.define(
  "product_details",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "product_details",
    timestamps: false,
  },
);

export default ProductDetail;
