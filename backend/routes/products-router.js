import express from "express";
import multer from 'multer';

import productsController from "../controller/products-controller.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.use('/uploads', express.static('/uploads'))

router.post('/products', productsController.create);
router.put('/products/:productid', productsController.edit);
router.put('/products/:productid/imageupload', upload.single("pic"), productsController.imgupload);
router.get('/products', productsController.getCurrent);
router.get('/products/:productid', productsController.getOne);
router.delete('/products/:productid', productsController.delete);
router.get('/uploads/:imgpath', productsController.getImage);
// router.get('/uploads/:imgpath', (req, res) => {
//     const { imgpath } = req.params;
//     res.sendFile(path.resolve(`./uploads/${imgpath}`))
// })
// router.get('/products/:pagesize/:currentpage', productsController.getCurrent)

export default router;
