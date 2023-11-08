import { nanoid } from "nanoid";
import sharp from 'sharp';
import productsModel from "../database/models/products-model.js";
import productsCategoriesModel from "../database/models/products-categories-model.js";
import { createProductValidation } from "../utils/validation/productValidation.js";
import { Categories, Products, sequelize } from "../database/connection2.js";
import { Op, Sequelize } from "sequelize";

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
        const product = await Products.create({ title, price, description, id, stock, visible, limited, image_path: path ? `${path}-resized` : path });
        const category = await productsCategoriesModel.create({id, categories})
        return product
    },

    getAll() {
        return productsModel.getAll()
    },

    async getCurrent({ pageSize, page, sortBy, order, filter, products }) {        
        if(filter) filter = filter[0].split(',')
        else filter = []; 
        console.log(filter, "filter");
        if(products == "all") products = -1
        else products = 0;
        console.log(products);

        const allproducts = await Products.findAll({
            include: {
                model: Categories,
                where: {
                    name: {
                        [Op.in]: filter
                    },

                    
                }
            },
            where: {
                stock: {
                    [Op.gt]: products
                }
            },
            group: 'id',
            order: [sortBy, order],
            limit: pageSize,
            offset: pageSize * (page -1)
        })
        const totalProducts = await sequelize.query(`
        SELECT COUNT(*) as total FROM ( 
            SELECT COUNT(*) FROM products p
            JOIN products_categories pc ON pc.product_id = p.id
            JOIN categories c ON c.id = pc.category_id   
            AND p.stock > 0
            GROUP BY p.id
        );`)
        console.log(allproducts, "all");
        return {products: allproducts, total: totalProducts}
        // return productsModel.getCurrent({ pageSize, page, sortBy, order, filter, products })
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
