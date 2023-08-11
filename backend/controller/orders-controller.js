import cartItemsServices from "../services/cart-items-services.js";
import ordersServices from "../services/orders-services.js";

export default {
    create(req, res, next) {
        const { userid } = req.body;
        const extra_info = "default message"
        ordersServices
            .create({ userid, extra_info })
            .then(resp => {
                if(resp.ok) {
                    cartItemsServices.deletCart({ userid })
                    .then(resp => res.status(201).send(resp))
                    .catch(next)
                }
            })
            .catch(next)
    },

    getUserOrders(req, res, next) {
        const userid = req.session.user.localId
        console.log(req.session.user, 'user in order');
        ordersServices
            .getUserOrders({ userid })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    }
}