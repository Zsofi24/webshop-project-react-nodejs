import express from "express";
import categoriesController from "../controller/categories-controller.js";

const router = express.Router();

router.post('/categories', categoriesController.create);
router.get('/categories', categoriesController.getAll)

export default router;