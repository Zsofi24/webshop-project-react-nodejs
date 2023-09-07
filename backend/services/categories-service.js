import categoriesModel from "../database/models/categories-model.js";

export default {
    create({ name }) {
        return categoriesModel.create({ name })
    },

    getAll() {
        return categoriesModel.getAll()
    },

    getCurrent({ currentPage, pageSize, sortBy, order }) {
        return categoriesModel.getCurrent({ currentPage, pageSize, sortBy, order })
    },

    getOne({ categoryid }) {
        return categoriesModel.getOne({ categoryid })
    },

    update(name, id) {
        return categoriesModel.update(name, id)
    }
}