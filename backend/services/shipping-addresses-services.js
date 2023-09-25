import shippingAddressesModel from "../database/models/shipping-addresses-model.js";

export default {
    getOne({ userId }) {
        return shippingAddressesModel.getOne({ userId })
    },

    create({userId}, shippingAddress) {
        return shippingAddressesModel.create({userId}, shippingAddress)
    }
}