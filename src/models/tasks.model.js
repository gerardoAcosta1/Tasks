import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Task = db.define(
    'tasks',
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull:false
        },
        completed: {
            type: DataTypes.BOOLEAN(),
            defaultValue: false,
        }
    },
    {
        timestamps: false
    }
);
export default Task