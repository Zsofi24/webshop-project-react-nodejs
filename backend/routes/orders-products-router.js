import express from "express";
import ordersProductsController from "../controller/orders-products-controller.js";

const router = express.Router();

router.post('/orders-products', ordersProductsController.create);

export default router;