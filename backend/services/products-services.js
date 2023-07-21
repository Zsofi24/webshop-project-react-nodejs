import productsModel from "../database/models/products-model.js";

export default {
    create({ title, price, description }) {
        return productsModel.create({ title, price, description })
    },
    getAll() {
        return productsModel.getAll()
    },
    getCurrent({ pageSize, currentPage, sortBy, order }) {
        return productsModel.getCurrent({ pageSize, currentPage, sortBy, order})
    }
}