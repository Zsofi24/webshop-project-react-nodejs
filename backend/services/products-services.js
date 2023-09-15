import { nanoid } from "nanoid";
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";

export default {
    async create({ title, price, description, id, stock, newcategories: categories, visible, limited }) {
        if(!id) {
            id = nanoid(8)
        }
        const resp = await productsModel.create({ title, price, description, id, stock, visible, limited })
        const resp2 = await productsCategoriesModel.setToProduct(id, categories)
        return resp2
    },
    imgupload(newPath, productid) {
        return productsModel.imgupload(newPath, productid)
    },
    getAll() {
        return productsModel.getAll()
    },
    getCurrent({ pageSize, currentPage, sortBy, order, filter, products }) {
        if(!Array.isArray(filter) && filter) filter = [filter];
        if(products == "all") products = -1
        else products = 0
        return productsModel.getCurrent({ pageSize, currentPage, sortBy, order, filter, products })
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