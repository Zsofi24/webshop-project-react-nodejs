import express from "express";
import categoriesController from "../controller/categories-controller.js";

const router = express.Router();

router.post('/categories', categoriesController.create);
router.get('/categories', categoriesController.getAll);
router.get('/categories/:categoryid', categoriesController.getOne)
router.put('/categories/:categoryid', categoriesController.update)


export default router;