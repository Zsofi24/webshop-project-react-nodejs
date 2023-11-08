import { DataTypes } from "sequelize";
import { Products, Users } from "../connection2.js";

const UsersProductsModel = (sequelize) => {
    const UsersProducts = sequelize.define(
    'UsersProducts',
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Products,
                key: 'id'
            }
        },
        amount: DataTypes.INTEGER
    }
    )

    return UsersProducts;
}

export default UsersProductsModel;
