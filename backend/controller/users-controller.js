import usersServices from "../services/users-services.js";

export default {
    signup(req, res, next) {
        console.log(req.body);
        const { email, password, username } = req.body;
        // console.log(email, password, username);
        usersServices
            .create({email, password, username})
            .then(resp => res.status(201).send(resp.message))
            .catch(next)
    },

    login(req, res, next) {
        const { email, password } = req.body;
        usersServices
            .find({ email, password })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}