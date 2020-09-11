import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401).json({
      messageAlert: "Você não tem permissão",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const { id } = payload as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.json({ message: "Você não está autenticado" });
  }
}
