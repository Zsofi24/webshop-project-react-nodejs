import { DataTypes } from "sequelize"
import { Users } from "../connection2.js";

const ShippingAddressesModel = (sequelize) => {
    const ShippingAddresses = sequelize.define(
    'ShippingAddresses',
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: Users,
                key: 'id'
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        familyname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tax_number: DataTypes.INTEGER
    }
    );

    return ShippingAddresses;
}

export default ShippingAddressesModel;
