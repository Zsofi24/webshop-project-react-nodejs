import authModel from "../database/models/auth-model.js";

export default {
    create({ email, password, username }) {
        const isAdmin = false;
        return authModel.create({ email, password, username, isAdmin });
    },
    find({ email, password , req}) {
        return authModel.find({ email, password, req})
    }
}