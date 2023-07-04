import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";
import { MessageController } from "../Controllers/MessageController";

const routes = Router();

routes.post(
  "/message/:userId/:chatId",
  isAuth,
  authMiddleware,
  new MessageController().sendMessage
);

export default routes;
