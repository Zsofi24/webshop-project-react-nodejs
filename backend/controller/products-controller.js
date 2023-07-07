import productsServices from "../services/products-services.js";

export default {
    create(req, res, next) {
        const { title, price, description } = req.body;
        productsServices
            .create({ title, price, description })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },
    getAll(req, res, next) {
        productsServices
            .getAll()
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}

