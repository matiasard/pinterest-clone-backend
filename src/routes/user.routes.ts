import { Router } from 'express';
import { userCtrl } from './../services/user.services';

export const userRouter = Router();

userRouter.get('/', userCtrl.getUsers )