import usersModel from "../database/models/users-model.js";

export default {
    create({ email, password, username }) {
        const isAdmin = false;
        return usersModel.create({ email, password, username, isAdmin });
    },
    find({ email, password , req}) {
        return usersModel.find({ email,password , req})
    }
}