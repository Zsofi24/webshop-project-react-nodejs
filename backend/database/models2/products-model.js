import {Sequelize, DataTypes} from 'sequelize';
import { nanoid } from 'nanoid';

const ProductsModel = (sequelize) => {
    const Products = sequelize.define(
    'Products',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => nanoid(10)
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        limited: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        image_path: {
            type: DataTypes.STRING
        }
    }
    )

    return Products;
}

export default ProductsModel;
