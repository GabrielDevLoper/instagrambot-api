import { Router } from "express";
import UserController from "@controllers/UserController";
import SessionController from "@controllers/SessionController";

import authMiddleware from "./middlewares/auth";
import checkRoles from "./middlewares/checkRoles";
import CommentController from "@controllers/CommentController";

const routes = Router();

/*Rotas para os usuarios */
routes.post("/users", UserController.create);

/**Rota para logar no sistema */
routes.post("/sessions", SessionController.create);

/*Rotas para gerenciar os sorteios */
routes.use(authMiddleware);
routes.get("/comments/:user_id", CommentController.index);
routes.post("/comments/:user_id", CommentController.create);
routes.delete("/comments/:sorteio_id", CommentController.delete);
routes.put("/comments/:sorteio_id", CommentController.update);

export default routes;
