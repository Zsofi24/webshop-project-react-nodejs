import cartItemsServices from "../services/cart-items-services.js";

export default  {
    addToCart(req, res, next) {
        const { userid, productid } = req.body;
        console.log(req.body, "body");
        cartItemsServices
            .addToCart({ userid, productid })
            // .then(resp => resp.status(201).send(resp))
            // .catch(next)
    }
}