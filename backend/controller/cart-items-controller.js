import cartItemsServices from "../services/cart-items-services.js";

export default  {
    addToCart(req, res, next) {
        const { userid, productid } = req.body;
        console.log(req.body, "body");
        cartItemsServices
            .addToCart({ userid, productid })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    getCartItems(req, res, next) {
        const userid = req.session.user.localId;
        cartItemsServices
            .getCartItems({ userid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}