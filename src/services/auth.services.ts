import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./../db";
import { getConfig } from "./../config/serverconfig";

interface AuthCtrl {
  register: (req: Request, res: Response) => void;
  login: (req: Request, res: Response) => void;
  refreshTokenKey: (req: Request, res: Response) => void;
}

// interface TokenString {
//   email: string;
//   iat: number;
//   exp: number;
// }

export const authCtrl = {} as AuthCtrl;

authCtrl.register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(403).json({ ok: false, msj: "Campos incompletos" });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
    });
    res.json({ ok:true, msg: "Se registro correctamente", newUser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Error al registrar usuario",
      error: error.message,
    });
  }
};

authCtrl.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  //* 📝1. verificar email en la BD y obetenerlo
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    console.log(user);
    if (user === null) {
      res.status(404).json({ ok: false, error: "User not found" });
      return;
    }

    //* 📝2. verificar la contraseña con bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { email, username } = user;
      const accessTokenKey = jwt.sign(
        { email, username },
        getConfig().accessTokenSecretKey,
        {
          expiresIn: "1h",
        }
      );
      const refreshTokenKey = jwt.sign(
        { email },
        getConfig().refreshTokenSecretKey,
        {
          expiresIn: "5h",
          // expiresIn: 60,
        }
      );

      res.json({
        ok: true,
        user,
        accessTokenKey,
        refreshTokenKey,
      });
      return;
    }

    res.status(401).json({ ok: false, msj: "Invalid password" });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

authCtrl.refreshTokenKey = async (req: Request, res: Response) => {
  //* 📝1. OBTENER el token del header
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED1: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];

  try {
    // 📝2. VALIDAR token
    const data: any = jwt.verify(token, getConfig().refreshTokenSecretKey);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user === null) {
      res.status(404).json({ message: "Refresh Token Not Found" });
      return;
    }

    if (data) {
      const { email } = user;
      const accessTokenKey = jwt.sign(
        { email, role: "ADMIN" },
        getConfig().accessTokenSecretKey,
        {
          expiresIn: "1h",
        }
      );
      const refreshTokenKey = jwt.sign(
        { email },
        getConfig().refreshTokenSecretKey,
        {
          expiresIn: "24h",
        }
      );
      res.json({
        ok: true,
        user,
        accessTokenKey,
        refreshTokenKey,
      });
    }
  } catch (error: any) {
    // Verifica si el Token esta EXPIRADO o no.
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "NOT AUTHORIZED2: TOKEN EXPIRED" });
      return;
    }
    res.status(500).json({ message: "NOT AUTHORIZED: TOKEN NO VALID" });
  }
};
