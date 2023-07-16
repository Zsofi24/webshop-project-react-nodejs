import ordersProductsModel from "../database/models/orders-products-model.js";

export default {
    create({ orderid, cart }) {
        return ordersProductsModel.create({ orderid, cart})
    }
}