import { nanoid } from "nanoid";
import sharp from 'sharp';
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";

export default {
    async create({ title, price, description, id, stock, categories, visible, limited, path }) {
        if(!id) {
            id = nanoid(8)
        }
        visible = JSON.parse(visible);
        limited = JSON.parse(limited);
        const resizedImg = await sharp(path).resize({width: 640, height: 1014}).toFile(`${path}-resized`)
        const resp = await productsModel.create({ title, price, description, id, stock, visible, limited, path: `${path}-resized` })
        const resp2 = await productsCategoriesModel.setToProduct(id, categories)
        return resp2
    },
    // imgupload(newPath, productid) {
    //     return productsModel.imgupload(newPath, productid)
    // },

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

    async edit({ title, price, description, id, categories, stock, visible, path, limited }) {
        visible = JSON.parse(visible);
        limited = JSON.parse(limited);

        if(path) {
           const resizedImg = await sharp(path).resize({width: 640, height: 1014}).toFile(`${path}-resized`)
           path = `${path}-resized`
        }

        await productsCategoriesModel.delete(id)
        if(categories) {
           await productsCategoriesModel.setToProduct(id, categories)
        }
        const productsResp = await productsModel.edit({ title, price, description, id, stock, visible, path, limited })
        return productsResp               
    },

    delete(id) {
        return productsModel.delete(id)
    }
}
