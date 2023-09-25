import express from "express";
import billingAddressesController from "../controller/billing-addresses-controller.js";

const router = express.Router();

router.get('/billing-addresses/user', billingAddressesController.getOne);


export default router;
