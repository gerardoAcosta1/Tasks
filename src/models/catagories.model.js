import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Category = db.define(
    'categories',
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    },
    {
        timestamps: false
    }
);

export default Category