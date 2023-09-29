import { Router } from 'express';
import { imageCtrl } from './../services/image.services';
import { authMiddleware } from '../middleware/authMiddleware';

export const imagesRouter = Router();

//? authMiddleware Verificara que el Usuario este Logueado para acceder a las siguientes Rutas
imagesRouter.get('/:id', authMiddleware,  imageCtrl.getImages);
imagesRouter.post('/', authMiddleware, imageCtrl.addFavoriteImage);
imagesRouter.delete('/:id', authMiddleware,  imageCtrl.removeFavoriteImage);
