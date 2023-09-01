import { nanoid } from "nanoid";
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";

export default {
    async create({ title, price, description, id, stock, newcategories: categories, visible }) {
        if(!id) {
            id = nanoid(8)
        }
        const resp = await productsModel.create({ title, price, description, id, stock, visible })
        const resp2 = await productsCategoriesModel.setToProduct(id, categories)
        return resp2
    },
    getAll() {
        return productsModel.getAll()
    },
    getCurrent({ pageSize, currentPage, sortBy, order, filter }) {
        if(!Array.isArray(filter) && filter) filter = [filter]
        return productsModel.getCurrent({ pageSize, currentPage, sortBy, order, filter })
    },
    getOne({ productid }) {
        return productsModel.getOne({ productid })
    },
    async edit({ title, price, description, id, stock, categories, visible }) {
        console.log(id, "id");
        if(categories) {
            const resp = await productsCategoriesModel.delete(id)
            const resp2 = await productsCategoriesModel.setToProduct(id, categories)
            const productsResp = await productsModel.edit({ title, price, description, id, stock, visible })
            return productsResp                 
        } else {
            const productsResp = await productsModel.edit({ title, price, description, id, stock, visible })
            return productsResp               
        }
    },
    delete(id) {
        return productsModel.delete(id)
    }
}