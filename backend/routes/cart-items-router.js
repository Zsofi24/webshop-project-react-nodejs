import express from "express";
import cartItemsController from "../controller/cart-items-controller.js";

const router = express.Router();

router.post('/cart', cartItemsController.addToCart);
router.get('/cart', cartItemsController.getCartItems);
router.put('/cart/:userid/:productid', cartItemsController.updateCart);

export default router;
