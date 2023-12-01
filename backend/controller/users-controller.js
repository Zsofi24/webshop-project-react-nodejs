import usersServices from "../services/users-services.js";

export default {
    getCurrent(req, res, next) {
        let { page, pageSize, sortBy, order, q } = req.query;
        if(!page) page = 1;
        if(!pageSize) pageSize = 15;
        usersServices
            .getCurrent({ page, pageSize, sortBy, order, q })
            .then(resp => res.status(200).json(resp))
            .catch(next)
    },

    getUser(req, res, next) {
        let { userid } = req.params;
        usersServices
            .getUser({ userid })
            .then(resp => res.status(200).json(resp))
            .catch(next)
    },

    createUser(req, res, next) {
        const { email, isAdmin, password, username, id } = req.body;
        usersServices
            .createUser({ email, isAdmin, password, username, id })
            .then(resp => res.status(201).json(resp))
            .catch(next)
    },

    updateUser(req, res, next) {
        let { isAdmin, username, id: userid } = req.body;
        usersServices
            .updateUser({ isAdmin, username, userid })
            .then(resp => res.status(200).json(resp))
            .catch(next)
    }
}