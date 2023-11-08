import { nanoid } from "nanoid";
import { DataTypes } from "sequelize";

const CategoriesModel = (sequelize) => {
    const Categories = sequelize.define(
    'Categories', 
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            default: () => nanoid(5)
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return Categories;
}

export default CategoriesModel;
