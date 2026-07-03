import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define(
    "Admin",
    {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    username:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
},{tableName : "admin",
    timestamps : true,
    underscored : true,
})

export default Admin