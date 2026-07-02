import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    order_date: {
      type: DataTypes.DATE,
    },
    customer_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    total_amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  },
);

export default Order;