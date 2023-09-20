import ordersProductsModel from "../database/models/orders-products-model.js";

export default {
    create({ orderId, cart }) {
        return ordersProductsModel.create({ orderId, cart})
    }
}