import productsCategoriesModel from "../database/models/products-categories-model.js";

export default {
    getToProduct({ productid }) {
        return productsCategoriesModel.getToProduct({ productid })
    },
    delete({ id }) {
        return productsCategoriesModel.delete({ id })
    }

}