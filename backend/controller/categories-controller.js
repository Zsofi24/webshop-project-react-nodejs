import categoriesService from "../services/categories-service2.js";

export default {
    create(req, res, next) {
        const { id, name } = req.body;
        categoriesService
            .create({ id, name })
            .then(resp => res.status(201).send(resp))
            .catch(err => next(err))
    },

    getAll(req, res, next) {
        categoriesService
            .getAll()
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getCurrent(req, res, next) {
        let { page, pageSize, sortBy, order } = req.query;
        if(!page) page = 1;
        if(!pageSize) pageSize = 5;
        categoriesService
            .getCurrent({ page, pageSize, sortBy, order })
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

    },

    delete(req, res, next) {
        const { categoryid: id } = req.params;
        console.log(id, "id");
        categoriesService
            .delete(id)
            .then(resp => res.status(201).send(resp))
            .catch(next)

    }
}