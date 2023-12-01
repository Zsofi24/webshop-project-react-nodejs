import { log } from "console";
import productsServices from "../services/products-services.js";
import path from 'path';

export default {
    create(req, res, next) {
        const { title, price, description, id, stock, visible, categories, limited } = req.body;
        const path = req.file? req.file.path : null
        productsServices
            .create({ title, price, description, id, stock, categories, visible, limited, path })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    getAll(req, res, next) {
        productsServices
            .getAll()
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getCurrent(req, res, next) {
        // console.log(req.app.get('env'))
        let { page, pageSize, sortBy, order, filter, products, q } = req.query;
        if(!page) page = 1;
        if(!pageSize) pageSize = 10;
        if(!products) products = "all";
        productsServices
            .getCurrent({ page, pageSize, sortBy, order, filter, products, q })
            .then(resp => res.status(200).send(resp))
            .catch(next)    
    },

    getOne(req, res, next) {
        const { productid } = req.params;
        productsServices
            .getOne({ productid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getImage(req, res, next) {
        const { imgpath } = req.params;
        res.sendFile(path.resolve(`./uploads/${imgpath}`))    
    },

    edit(req, res, next) {
        console.log(req.body, "body edit");
        const path = req.file ? req.file.path.replace(/\\/g, '/') : req.body.path;
        const { title, price, description, id, categories, stock, visible, limited } = req.body;
        productsServices.edit({ title, price, description, id, categories, stock, visible, path, limited })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    delete(req, res, next) {
        const { productid: id } = req.params;
        productsServices.delete(id)
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}
