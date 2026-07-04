import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const SubCategory = sequelize.define(
    "SubCategory",
    {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    master_category_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    img_url:{
        type: DataTypes.STRING,
    },
},{
    tableName: "sub_categories",
    timestamps: false,
  })

export default SubCategory