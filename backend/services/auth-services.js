import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import userModel from '../database/models/user-model.js';
import { createUserValidation } from '../utils/validation/userValidation.js';

export default {
    create({ email, password, username }) {
        createUserValidation({ email, password, username })
        const isAdmin = false;
        const id = nanoid(16);
        const hash = bcrypt.hashSync(password, 10)
        return userModel.create({ id, email, hash, username, isAdmin });
    },
    
    find({ email, password , req}) {
        return userModel.find({ email, password, req})
    }
}
