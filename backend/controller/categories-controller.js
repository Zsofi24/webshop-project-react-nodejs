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
        categoriesService
            .getAll()
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}