import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("users",{
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
    email:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING,
    }
},{
    tableName: "users",
  })

export default User