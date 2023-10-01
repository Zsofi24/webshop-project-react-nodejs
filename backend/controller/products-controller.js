import productsServices from "../services/products-services.js";
import path from 'path';

export default {
    create(req, res, next) {
        const { title, price, description, id, stock, visible, categories, limited } = req.body;
        const path = req.file.path.replace(/\\/g, '/');
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
        let { currentPage, pageSize, sortBy, order, filter, products } = req.query;
        if(!currentPage) currentPage = 1;
        if(!pageSize) pageSize = 5;
        if(!products) products = "all";
        productsServices
            .getCurrent({ currentPage, pageSize, sortBy, order, filter, products })
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

    // imgupload(req, res, next) {
    //     console.log(req.file, "file");
    //     const { productid } = req.params;
    //     const newPath = req.file.path.replace(/\\/g, '/');
    //     console.log(productid, "productid");
    //     sharp(req.file.path)
    //         .resize({width: 640, height: 1014})
    //         .toFile(`${newPath}-resized`)
    //         .then(data => {
    //             console.log(data, "data");
    //             productsServices.imgupload(`${newPath}-resized`, productid)
    //             .then(resp => res.status(201).send(resp))
    //             .catch(next)
    //         })

    // },

    delete(req, res, next) {
        console.log(req.params);
        const { productid: id } = req.params;
        productsServices.delete(id)
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}

