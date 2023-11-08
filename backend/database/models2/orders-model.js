import { DataTypes } from "sequelize";
import { nanoid } from "nanoid";

const OrdersModel = (sequelize) => {
    const Orders = sequelize.define(
    'Orders',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => nanoid(10)
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        extra_info: DataTypes.TEXT,
        total: DataTypes.INTEGER
    }
    );

    return Orders;

}

export default OrdersModel;
