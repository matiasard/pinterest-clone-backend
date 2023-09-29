import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConfig } from "../config/serverconfig";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //* Solo usuarios Logueados
  // 1. Que este el header de autorizacion
  // 2. Que sea un token valido
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED1: TOKEN NOT PRESENT" });
    return;
  }

  const token = header.split(" ")[1];
  try {
    const data: any = jwt.verify(token, getConfig().accessTokenSecretKey);
    console.log(data);
    // res.locals.role = data.role;
    res.locals.email = data?.email;
    if (data) {
      next();
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "NOT AUTHORIZED2: TOKEN EXPIRED" });
      return;
    }

    res.status(401).json({ message: "NOT AUTHORIZED3: TOKEN NOT VALID" });
    return;
  }
};

export const authAdminMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals?.role && res.locals?.role === "ADMIN") {
    next();
    return;
  }
  res.status(403).json({ message: "NOT AUTHORIZED: NEED ADMIN ROLE" });
};
