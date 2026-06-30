import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const OrderDetail = sequelize.define(
  "order_details",
  {
    detail_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    order_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
     product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "order_details",
  },
);

export default OrderDetail;
