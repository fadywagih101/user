// routes/tokenRoute.ts
import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
const router = Router();
const authController = new AuthController();

router.post('/login', authController.getToken.bind(authController));

export default router;
