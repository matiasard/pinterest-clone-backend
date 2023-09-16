import { Request, Response } from "express";
import { prisma } from './../db';

interface User {
  getUsers: (req:Request, res: Response) => void;
}

export const userCtrl = {} as User;

userCtrl.getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json({users: users})
  } catch (error) {
    res.status(404).json({ok: false, error: error})
  }
};
