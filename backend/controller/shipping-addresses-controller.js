import shippingAddressesServices from "../services/shipping-addresses-services.js";

export default {
    getOne(req, res, next) {
        const userId = req.session.user.localId;
        shippingAddressesServices
            .getOne({ userId })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}