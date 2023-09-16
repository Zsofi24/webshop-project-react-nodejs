import categoriesService from "../services/categories-service.js";

export default {
    create(req, res, next) {
        const { id, name } = req.body;
        categoriesService
            .create({ id, name })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    getAll(req, res, next) {
        categoriesService
            .getAll()
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getCurrent(req, res, next) {
        let { currentPage, pageSize, sortBy, order } = req.query;
        if(!currentPage) currentPage = 1;
        if(!pageSize) pageSize = 5;
        categoriesService
            .getCurrent({ currentPage, pageSize, sortBy, order })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getOne(req, res, next) {
        const { categoryid } = req.params;
        categoriesService
            .getOne({ categoryid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    update(req, res, next) {
        console.log(req.body, "body");
        const { categoryName: name, categoryId: id} = req.body;
        categoriesService
            .update(name, id)
            .then(resp => res.status(201).send(resp))
            .catch(next)

    }
}