import categoriesService from "../services/categories-service.js";

export default {
    create(req, res, next) {
        const { name } = req.body;
        categoriesService
            .create({ name })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    getAll(req, res, next) {
        let { currentPage, pageSize, sortBy, order } = req.query;
        if(!currentPage) currentPage = 1;
        if(!pageSize) pageSize = 5;
        categoriesService
            .getAll({ currentPage, pageSize, sortBy, order })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}