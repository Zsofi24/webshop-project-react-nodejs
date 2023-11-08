import { DataTypes } from "sequelize";
import { Orders, Products } from "../connection2.js";

const OrdersProductsModel = (sequelize) => {
    const OrdersProducts = sequelize.define(
    'OrdersProducts',
    {
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Orders,
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

    return OrdersProducts;
}

export default OrdersProductsModel;
