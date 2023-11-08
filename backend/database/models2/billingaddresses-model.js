import { DataTypes } from "sequelize"
import { Users } from "../connection2.js";

const BillingAddressesModel = (sequelize) => {
    const BillingAddresses = sequelize.define(
    'BillingAddresses',
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

    return BillingAddresses;
}

export default BillingAddressesModel;
