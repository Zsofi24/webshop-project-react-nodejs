import {Sequelize, DataTypes} from 'sequelize';
import { nanoid } from 'nanoid';

const UsersModel = (sequelize) => {
    const Users = sequelize.define(
    'Users',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => nanoid(20)
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
    )

    return Users
}

export default UsersModel;