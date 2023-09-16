import { Router } from 'express';
import { authCtrl } from '../services/auth.services';

export const authRouter = Router();

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.post('/refrestoken', authCtrl.refreshTokenKey);