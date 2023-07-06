import express from "express";
import productsController from "../controller/products-controller.js";
import usersController from "../controller/users-controller.js";

const router = express.Router();

router.post('/products', productsController.create);

export default router;
