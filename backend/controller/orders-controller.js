import cartItemsServices from "../services/cart-items-services.js";
import ordersProductsServices from "../services/orders-products-services.js";
import ordersServices from "../services/orders-services.js";

export default {
    create(req, res, next) {
        const { userId, cart, total } = req.body;
        const extraInfo = "default message"
        ordersServices
            .create({ userId, extraInfo, total })
            .then(resp => {
                if(resp.id) {
                    ordersProductsServices.create({orderId: resp.id, cart })
                    .then(resp => {
                            if(resp.orderId) {
                                cartItemsServices.deletCart({ userId })
                                .then(resp => res.status(201).send(resp))
                            }
                        
                    })
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