import express from "express";
import categoriesController from "../controller/categories-controller.js";

const router = express.Router();

router.post('/categories', categoriesController.create);
router.get('/categories', categoriesController.getCurrent);
router.get('/allcategories', categoriesController.getAll);
router.get('/categories/:categoryid', categoriesController.getOne);
router.put('/categories/:categoryid', categoriesController.update);
router.delete('/categories/:categoryid', categoriesController.delete);


export default router;