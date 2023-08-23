import { nanoid } from "nanoid";
import productsModel from "../database/models/products-model.js";

export default {
    create({ title, price, description, id, stock }) {
        if(!id) {
            id = nanoid(8)
        }
        return productsModel.create({ title, price, description, id, stock })
    },
    getAll() {
        return productsModel.getAll()
    },
    getCurrent({ pageSize, currentPage, sortBy, order }) {
        return productsModel.getCurrent({ pageSize, currentPage, sortBy, order})
    },
    getOne({ productid }) {
        return productsModel.getOne({ productid })
    },
    edit({ title, price, description, id }) {
        return productsModel.edit({ title, price, description, id })
    }
}