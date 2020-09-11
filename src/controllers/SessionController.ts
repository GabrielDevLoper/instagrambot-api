import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const repo = getRepository(User);

    const user = await repo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({ message: "Usuário não encontrado" });
    }

    //verificando se a senha esta correta e consequentemente retornando se ela
    //estiver incorreta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: "Senha Incorreta" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    return res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      token,
    });
  },
};
