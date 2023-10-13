import { nanoid } from "nanoid";
import categoriesModel from "../database/models/categories-model.js";

export default {
    create({ id, name }) {
        if(!id) id = nanoid(6);
        return categoriesModel.create({ id, name })
    },

    getAll() {
        return categoriesModel.getAll()
    },

    getCurrent({ page, pageSize, sortBy, order }) {
        return categoriesModel.getCurrent({ page, pageSize, sortBy, order })
    },

    getOne({ categoryid }) {
        return categoriesModel.getOne({ categoryid })
    },

    update(name, id) {
        return categoriesModel.update(name, id)
    },

    delete(id) {
        return categoriesModel.delete(id)
    }
}