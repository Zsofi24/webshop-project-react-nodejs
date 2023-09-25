import billingAddressesServices from "../services/billing-addresses-services.js";

export default {
    getOne(req, res, next) {
        const userId = req.session.user.localId;
        billingAddressesServices
            .getOne({ userId })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}