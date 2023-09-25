import billingAddressesServices from "../services/billing-addresses-services.js";
import cartItemsServices from "../services/cart-items-services.js";
import ordersProductsServices from "../services/orders-products-services.js";
import ordersServices from "../services/orders-services.js";
import shippingAddressesServices from "../services/shipping-addresses-services.js";

export default {
    create(req, res, next) {
        console.log(req.body, "body");
        const { userId, cart, total, shippingAddress, billingAddress } = req.body;
        const extraInfo = "default message"
        ordersServices
            .create({ userId, extraInfo, total })
            .then(resp => {
                if(resp.id) {
                    ordersProductsServices.create({orderId: resp.id, cart })
                    .then(resp => {
                            if(resp.orderId) {
                              return cartItemsServices.deletCart({ userId })
                            }
                            
                        })
                    }
                })
            .then(() => {
                return shippingAddressesServices
                    .create({userId}, shippingAddress)
            })
            .then(() => {
                return billingAddressesServices
                    .create({userId}, billingAddress)
            })
            .then(resp => res.status(201).send(resp))
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