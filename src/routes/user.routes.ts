import { Router } from 'express';
import { userCtrl } from './../services/user.services';
import { authMiddleware } from '../middleware/authMiddleware';

export const userRouter = Router();

//? authMiddleware Verificara que el Usuario este Logueado para acceder a las siguientes Rutas
userRouter.get('/', authMiddleware, userCtrl.getUsers )