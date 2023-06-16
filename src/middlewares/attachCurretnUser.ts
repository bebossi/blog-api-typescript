import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";

declare module "express" {
  interface Request {
    currentUser?: User;
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(403);
    }

    const token = authorization.replace("Bearer", "").trim();
    const secret = process.env.TOKEN_SIGN_SECRET as string;

    const data = jwt.verify(token, secret) as User;
    const user = await userRepository.findOne({ where: { id: data.id } });

    req.currentUser = user as User;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
