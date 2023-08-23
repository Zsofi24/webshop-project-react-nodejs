import categoriesModel from "../database/models/categories-model.js";

export default {
    create({ name }) {
        return categoriesModel.create({ name })
    },

    getAll() {
        return categoriesModel.getAll()
    }
}