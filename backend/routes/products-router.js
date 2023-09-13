import express from "express";
import multer from 'multer';

import productsController from "../controller/products-controller.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post('/products', productsController.create);
router.put('/products/:productid', productsController.edit);
router.put('/products/:productid/imageupload', upload.single("pic"), productsController.imgupload);
router.get('/products', productsController.getCurrent);
router.get('/products/:productid', productsController.getOne)
router.delete('/products/:productid', productsController.delete)
// router.get('/products/:pagesize/:currentpage', productsController.getCurrent)

export default router;
