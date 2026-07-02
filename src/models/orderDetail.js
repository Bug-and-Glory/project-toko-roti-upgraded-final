import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    detail_id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    order_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "order_details",
    timestamps: false,
  },
);

export default OrderDetail;