import express from "express";
import multer from 'multer';

import productsController from "../controller/products-controller.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.use('/uploads', express.static('/uploads'))

router
    .route('/products')
    .post(upload.single("pic"), productsController.create)
    .get(productsController.getCurrent)

router
    .route('/products/:productid')
    .get(productsController.getOne)
    .put(productsController.edit)
    .delete(productsController.delete)

router
    .route('/uploads/:imgpath')
    .get(productsController.getImage)
    
// router
//     .route('/products/:productid/imageupload')
//     .put(upload.single("pic"), productsController.imgupload)


// router.get('/uploads/:imgpath', (req, res) => {
//     const { imgpath } = req.params;
//     res.sendFile(path.resolve(`./uploads/${imgpath}`))
// })
// router.get('/products/:pagesize/:currentpage', productsController.getCurrent)

export default router;
