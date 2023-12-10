import express from "express";
import ordersController from "../controller/orders-controller.js";

const router = express.Router();

router
    .route('/orders')
    .post(ordersController.create)

router
    .route('/orders/:userid')
    .get(ordersController.getUserOrders)

router 
    .route('/orders/user')
    .get(ordersController.getUserOrders)

router
    .route('/orders/user/:orderid')
    .get(ordersController.getOrder)

// router.post('/orders', ordersController.create);
// router.get('/orders/user', ordersController.getUserOrders);
// router.get('/orders/user/:orderid', ordersController.getOrder);

export default router;