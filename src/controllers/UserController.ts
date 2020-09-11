import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";

export default {
  async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const { username, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ username, email, password });
    await repository.save(user);

    return res.json(user);
  },
};
