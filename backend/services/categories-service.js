import categoriesModel from "../database/models/categories-model.js";

export default {
    create({ name }) {
        return categoriesModel.create({ name })
    },

    getAll({ currentPage, pageSize, sortBy, order }) {
        return categoriesModel.getAll({ currentPage, pageSize, sortBy, order })
    }
}