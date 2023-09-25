import billingAddressesModel from "../database/models/billing-addresses-model.js"

export default {
    getOne({ userId }) {
        return billingAddressesModel.getOne({ userId })
    },

    create({ userId }, billingAddress) {
        return billingAddressesModel.create({ userId }, billingAddress)
    }
}