import express from "express";
import shippingAddressesController from "../controller/shipping-addresses-controller.js"

const router = express.Router();

router.get('/shipping-addresses/user', shippingAddressesController.getOne);

export default router;
