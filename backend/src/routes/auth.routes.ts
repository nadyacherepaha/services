import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refresh);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgot);
router.post('/reset-password', AuthController.reset);

export default router;
