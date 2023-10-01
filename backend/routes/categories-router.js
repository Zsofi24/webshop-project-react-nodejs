import express from "express";
import categoriesController from "../controller/categories-controller.js";
import adminVerify from "../middlewares/admin-verify.js";

const router = express.Router();

router
    .route('/categories')
    .post(adminVerify, categoriesController.create)
    .get(categoriesController.getCurrent)

router
    .route('/categories/:categoryid')
    .get(adminVerify, categoriesController.getOne)
    .put(adminVerify, categoriesController.update)
    .delete(adminVerify, categoriesController.delete)

router
    .route('/allcategories')
    .get(categoriesController.getAll)

// router.post('/categories', categoriesController.create);
// router.get('/categories', categoriesController.getCurrent);
// router.get('/categories/:categoryid', categoriesController.getOne);
// router.put('/categories/:categoryid', categoriesController.update);
// router.delete('/categories/:categoryid', categoriesController.delete);


export default router;