import { nanoid } from "nanoid";
import sharp from 'sharp';
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";
import { createProductValidation } from "../utils/validation/productValidation.js";

export default {
    async create({ title, price, description, id, stock, categories, visible, limited, path }) {
        createProductValidation({ title, price, stock, categories })
        if(!id) id = nanoid(8)
        visible = JSON.parse(visible) || true;
        limited = JSON.parse(limited) || false;
        if(path) {
            path.replace(/\\/g, '/')
            await sharp(path).resize({width: 640, height: 1014}).toFile(`${path}-resized`)
        }      
        await productsModel.create({ title, price, description, id, stock, visible, limited, path: path ? `${path}-resized` : path })
        const resp = await productsCategoriesModel.setToProduct(id, categories)
        return resp
    },

    getAll() {
        return productsModel.getAll()
    },

    getCurrent({ pageSize, page, sortBy, order, filter, products }) {        
        if(filter) filter = filter[0].split(',');  
        if(products == "all") products = -1
        else products = 0
        return productsModel.getCurrent({ pageSize, page, sortBy, order, filter, products })
    },
    
    getOne({ productid }) {
        return productsModel.getOne({ productid })
    },

    async edit({ title, price, description, id, categories, stock, visible, path, limited }) {
        visible = JSON.parse(visible);
        limited = JSON.parse(limited);

        if(path) {
           await sharp(path).resize({width: 640, height: 1014}).toFile(`${path}-resized`)
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
