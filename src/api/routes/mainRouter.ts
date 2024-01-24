// mainRouter.ts
import express from 'express';
import { Router } from 'express';
import UserRouter from './userRouter'

import authRouter from './authRouter';
import authenticateJWT from '../../middlewares/authenticateJWT';
const router: Router = express.Router();

router.use('/auth', authRouter);
router.use(authenticateJWT);

router.use('/user', UserRouter);

export default router;