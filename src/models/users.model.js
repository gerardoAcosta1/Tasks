import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const User = db.define(
    'users',
    {
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);
export default User