import sequelize from "../config/db.js";
import {DataTypes} from "sequelize"

const Comment = sequelize.define("comments", {
    comment_id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    comment: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    
})