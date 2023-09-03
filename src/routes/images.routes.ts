import { Router } from 'express';
import { imageCtrl } from './../services/image.services';

export const imagesRouter = Router();

imagesRouter.get('/', imageCtrl.getImages);
