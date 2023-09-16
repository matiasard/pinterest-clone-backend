import { Router } from 'express';
import { imageCtrl } from './../services/image.services';

export const imagesRouter = Router();

// imagesRouter.get('/', imageCtrl.getImages);
imagesRouter.get('/:id', imageCtrl.getImages);
imagesRouter.post('/', imageCtrl.addFavoriteImage);
imagesRouter.delete('/:id', imageCtrl.removeFavoriteImage);
// imagesRouter.delete('/',) ;
