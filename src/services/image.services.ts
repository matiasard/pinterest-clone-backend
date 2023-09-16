import { Request, Response } from "express";
import { prisma } from '../db'

interface ImagesCtrl {
  getImages: (req: Request, res: Response) => void
  addFavoriteImage: (req: Request, res: Response) => void;
  removeFavoriteImage: (req: Request, res: Response) => void;
}

export const imageCtrl: ImagesCtrl = {} as ImagesCtrl;

imageCtrl.getImages = async (req: Request, res: Response) => {
  try {
    const imagesSaved = await prisma.image.findMany({
      where: { userId: Number(req.params.id) },
      // include: { user: true },
    });
    res.json({
      ok: true,
      msg: "get all saved images",
      imagesSaved: imagesSaved
    });
    // throw Error;
  } catch (err: any) {
    console.log(err.message)
    res.status(404).json({ ok: false, msg: "Error: image no encotrado", Error: err.message });
  }
};

imageCtrl.addFavoriteImage = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const newFavoriteImage = await prisma.image.create({
      data: req.body,
    });
    res.json({
      ok: true, msg: "image saved successfully", imageGuardado: newFavoriteImage
    });
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ ok: false, msg: "Error: image not added", Error: error.message });
  }

}

imageCtrl.removeFavoriteImage = async (req: Request, res: Response) => {
  try {
    const imageFound = await prisma.image.delete({
      where: { 
        id: Number(req.params.id),
      }
    })

    res.json({
      ok: true,
      msg: "image deleted successfully",
      imageRemoved: imageFound,
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      ok: false,
      msg: "image not found",
    })
  }
}