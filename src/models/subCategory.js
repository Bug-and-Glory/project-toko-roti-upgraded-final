import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const SubCategory = sequelize.define("sub_categories",{
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
})

export default SubCategory