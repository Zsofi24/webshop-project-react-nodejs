import { nanoid } from "nanoid";
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";

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
    async edit({ title, price, description, id, stock, categories }) {
        console.log(id, "id");
        const resp = await productsCategoriesModel.delete(id)
        const resp2 = await productsCategoriesModel.setToProduct(id, categories)
        const productsResp = await productsModel.edit({ title, price, description, id, stock, categories })
        return productsResp
                 
    }
}