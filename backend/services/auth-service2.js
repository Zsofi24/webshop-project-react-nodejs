import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { Users } from '../database/connection2.js';
import { createUserValidation } from '../utils/validation/userValidation.js';
import HttpError from '../utils/httpError.js';

export default {
    create({ email, password, username }) {
        createUserValidation({ email, password, username })
        const isAdmin = false;
        const id = nanoid(16);
        password = bcrypt.hashSync(password, 10)
        return Users.create({ id, email, password, username, isAdmin });
    },
    
    async find({ email, password , req}) {
        const user = await Users.findOne({ where: { email }});
        if(!user) throw new HttpError('Invalid email or password', 400);
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if(!isValidPassword) throw new HttpError('Invalid email or password', 400);
        if(user && isValidPassword) {
            req.session.authenticated = true;
            req.session.isAdmin = user.isAdmin;
            req.session.user = {
                email: user.email,
                username: user.username,
                localId: user.id,
                isAdmin: user.isAdmin
            }
        }
        return {email: user.email,
            username: user.username,
            localId: user.id,
            isAdmin: user.isAdmin}

    }
}
