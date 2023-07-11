import usersModel from "../database/models/users-model.js";

export default {
    create({ email, password, username }) {
        return usersModel.create({ email, password, username });
    },
    find({ email, password , req}) {
        return usersModel.find({ email,password , req})
    }
}