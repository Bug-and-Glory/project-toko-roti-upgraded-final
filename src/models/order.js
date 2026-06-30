import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define(
  "orders",
  {
    order_id: {
      primaryKey: true,
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