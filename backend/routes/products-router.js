import express from "express";
import multer from 'multer';
import adminVerify from "../middlewares/admin-verify.js";
import productsController from "../controller/products-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.use('/uploads', express.static('/uploads'))

router
    .route('/products')
    .post(adminVerify, upload.single("pic"), productsController.create)
    .get(productsController.getCurrent)

router
    .route('/products/:productid')
    .get(productsController.getOne)
    .put(adminVerify, upload.single("pic"), productsController.edit)
    .delete(adminVerify, productsController.delete)

router
    .route('/uploads/:imgpath')
    .get(productsController.getImage)
    
export default router;
