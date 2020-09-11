import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";

export default function CheckRoles(roles: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.userId;

    const repo = getRepository(User);
    let user: User;
    try {
      user = await repo.findOneOrFail(id);
    } catch (error) {
      return res.status(401).send();
    }

    if (roles !== user.role) {
      return res.status(401).json({
        message: "Para executar esta ação você precisa ser ADMIN",
      });
    }

    if (roles === user.role) {
      return next();
    }
  };
}
