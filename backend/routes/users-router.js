import express from "express";
import usersController from "../controller/users-controller.js";

const router = express.Router();

router
    .route('/users')
    .get(usersController.getCurrent)
    .post(usersController.createUser)

router
    .route('/users/:userid')
    .get(usersController.getUser)
    .put(usersController.updateUser)

export default router;