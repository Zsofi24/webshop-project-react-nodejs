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

    updateCart(req, res, next) {
        const { productid, userid } = req.params;
        const { amount } = req.body;
        console.log(productid, userid, amount);
        cartItemsServices
            .updateCart({ productid, userid, amount })
            .then(resp => res.status(200).send(resp))
            .catch(next)

    },

    getCartItems(req, res, next) {
        const userid = req.session.user.localId;
        cartItemsServices
            .getCartItems({ userid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    },

    getCartTotal(req, res, next) {
        const userid = req.session.user.localId;
        cartItemsServices
            .getCartTotal({ userid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
   
    },

    deleteItem(req, res, next) {
        const { userid, productid } = req.params;
        cartItemsServices
            .deleteItem({ userid, productid })
            .then(resp => res.status(200).send(resp))
            .catch(next)
    }
}