import express from "express";
import productsController from "../controller/products-controller.js";

const router = express.Router();

router.post('/products', productsController.create);
router.put('/products/:productid', productsController.edit)
router.get('/products', productsController.getCurrent);
router.get('/products/:productid', productsController.getOne)
router.delete('/products/:productid', productsController.delete)
// router.get('/products/:pagesize/:currentpage', productsController.getCurrent)

export default router;
