import productsModel from "../database/models/products-model.js";

export default {
    create({ title, price, description }) {
        return productsModel.create({ title, price, description })
    },
    getAll() {
        return productsModel.getAll()
    }
}