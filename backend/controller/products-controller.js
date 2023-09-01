import productsServices from "../services/products-services.js";

export default {
    create(req, res, next) {
        const { title, price, description, id, stock, newcategories, visible } = req.body;
        productsServices
            .create({ title, price, description, id, stock, newcategories, visible })
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
        let { currentPage, pageSize, sortBy, order, filter } = req.query;
        // console.log(filter, "filter");
        if(!currentPage) currentPage = 1;
        if(!pageSize) pageSize = 5;
        productsServices
            .getCurrent({ currentPage, pageSize, sortBy, order, filter })
            .then(resp => res.status(201).send(resp))
            .catch(next)    
    },

    getOne(req, res, next) {
        const { productid } = req.params;
        productsServices
            .getOne({ productid })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    edit(req, res, next) {
        console.log(req.body, "body edit");
        const { title, price, description, id, categories, stock, visible } = req.body;
        productsServices.edit({ title, price, description, id, categories, stock, visible })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    delete(req, res, next) {
        console.log(req.params);
        const { productid: id } = req.params;
        productsServices.delete(id)
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}

