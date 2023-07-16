import ordersServices from "../services/orders-services.js";

export default {
    create(req, res, next) {
        const { userid } = req.body;
        ordersServices
            .create({ userid })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}