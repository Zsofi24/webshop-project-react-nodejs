import express from "express";
import cartItemsController from "../controller/cart-items-controller.js";

const router = express.Router();

router.post('/cart', cartItemsController.addToCart );

export default router;
