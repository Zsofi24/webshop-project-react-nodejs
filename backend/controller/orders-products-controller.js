import ordersProductsServices from "../services/orders-products-services.js";

export default {
    create(req, res, next) {
        const { orderid, cart } = req.body;
        console.log(req.body);
        ordersProductsServices
            .create({ orderid, cart})
            .then(resp => res.status(201).send(resp))
            .catch(next)
  
    }
}