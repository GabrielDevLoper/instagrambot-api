import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "@models/Comment";

export default {
  async index(req: Request, res: Response) {
    const commentRepository = getRepository(Comment);

    const { user_id } = req.params;

    const getComments = await commentRepository.find({
      where: {
        user: {
          id: Number(user_id),
        },
      },
      select: ["description", "drawlink", "comments", "facebook"],
    });

    // const convertCommentsInArray = getComments.map((res) => {
    //   const com = res.comments.split(",").map((comment: string) => {
    //     return comment;
    //   });

    //   return com;
    // });

    return res.json(getComments);
  },

  async create(req: Request, res: Response) {
    const repository = getRepository(Comment);
    const {
      emailOrUsername,
      password,
      description,
      drawlink,
      comments,
      useFacebook,
    } = req.body;

    const { user_id } = req.params;

    const comment = repository.create({
      emailOrUsername,
      password,
      facebook: useFacebook,
      description,
      drawlink,
      comments,
      user: {
        id: Number(user_id),
      },
    });
    await repository.save(comment);

    return res.json({ message: "Cadastrado com sucesso" });
  },

  async delete(req: Request, res: Response) {
    const repository = getRepository(Comment);
    const { sorteio_id } = req.params;

    await repository.delete({
      id: Number(sorteio_id),
    });

    return res.json({ message: "Excluído com sucesso" });
  },

  async update(req: Request, res: Response) {
    const repository = getRepository(Comment);
    const { sorteio_id } = req.params;
    const {
      emailOrUsername,
      password,
      description,
      drawlink,
      comments,
      useFacebook,
    } = req.body;

    const oldSorteio = await repository.findOne(Number(sorteio_id));

    const editSorteio = await repository.update(
      { id: Number(sorteio_id) },
      {
        emailOrUsername: emailOrUsername
          ? emailOrUsername
          : oldSorteio.emailOrUsername,
        password: password ? password : oldSorteio.password,
        description: description ? description : oldSorteio.description,
        drawlink: drawlink ? drawlink : oldSorteio.drawlink,
        comments: comments ? comments : oldSorteio.comments,
        facebook: useFacebook,
      }
    );

    return res.json(editSorteio);
  },

  async run(req: Request, res: Response) {
    const repository = getRepository(Comment);
    const { sorteio_id } = req.params;

    const getSorteio = await repository.find({
      where: {
        id: Number(sorteio_id),
      },
      select: ["emailOrUsername", "password", "drawlink", "comments"],
    });

    // const seriazlizedComments = getSorteio[0].comments
    //   .split(",")
    //   .map((comment: string) => {
    //     return comment.slice(1, 20);
    //   });

    const { emailOrUsername, password, drawlink } = getSorteio[0];

    // InstagramBotUseFacebook.RunScript(
    //   emailOrUsername,
    //   password,
    //   drawlink,
    //   seriazlizedComments
    // );

    // InstagramBotRun(emailOrUsername, password, drawlink, seriazlizedComments);

    return res.json({ message: "Executando..." });
  },
};
