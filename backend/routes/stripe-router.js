import express from "express";
import stripeController from "../controller/stripe-controller.js";

const router = express.Router();

router
    .route('/create-payment-intent')
    .post(stripeController.createIntent)

// router
//     .route('/checkout/create')
//     .post(stripeController.createCheckout)

export default router;
