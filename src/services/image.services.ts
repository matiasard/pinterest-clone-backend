import { Request, Response } from "express";

interface ImagesCtrl {
  getImages: (req: Request, res: Response) => void
  newFavoriteImage: (req: Request, res: Response) => void;
}

export const imageCtrl: ImagesCtrl = {} as ImagesCtrl

imageCtrl.getImages = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, msg: "Todo Bien: Imagenes aqui" });
    // throw Error;
  } catch (err) {
    console.log(err)
    res.status(404).json({ ok: false, msg: "Error: image no encotrado", err });
  }
};

imageCtrl.newFavoriteImage = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    // const newProduct = await prisma.favoriteImage.create({
    //   data: req.body,
    // });
    res.json("newProduct");
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error: image NO Agregado", error });
  }

}