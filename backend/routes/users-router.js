import express from "express";
import usersController from "../controller/users-controller.js";

const router = express.Router();

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
// router.get('/authentication', usersController.authentication);
router.post('/verify', usersController.verify);
router.get('/admin-verify', usersController.adminVerify);
router.get('/logout', usersController.logout)




export default router;