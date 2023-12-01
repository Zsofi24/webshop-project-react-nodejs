import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import { createUserValidation } from '../utils/validation/userValidation.js';
import userModel from "../database/models/user-model.js";

export default {
    getCurrent({ page, pageSize, sortBy, order, q }) {
        let search = q ? q : "";
        return userModel.getCurrent({ page, pageSize, sortBy, order, search });
    },

    getUser({ userid }) {
        return userModel.getUser({ userid })
    },

    createUser({ email, isAdmin, password, username, id }) {
        createUserValidation({ email, password, username })
        if(!id) {
            isAdmin ? id = `admin-${nanoid(11)}` : id = nanoid(16)
        }
        const hash = bcrypt.hashSync(password, 10);
        return userModel.create({ email, isAdmin, hash, username, id });
    },

    updateUser({ isAdmin, username, userid }) {
        return userModel.updateUser({ isAdmin, username, userid })
    }
}