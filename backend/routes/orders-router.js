import express from "express";
import ordersController from "../controller/orders-controller.js";

const router = express.Router();

router.post('/orders', ordersController.create);
router.get('/orders/user', ordersController.getUserOrders);
router.get('/orders/user/:orderid', ordersController.getOrder);

export default router;