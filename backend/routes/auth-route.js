import express from 'express';
import authController from '../controller/auth-controller.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.get('/admin-verify', authController.adminVerify);
router.get('/logout', authController.logout);

export default router;
