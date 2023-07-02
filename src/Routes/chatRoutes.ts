import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";
import { ChatController } from "../Controllers/ChatController";
const routes = Router();

routes.post(
  "/chat/:userId",
  isAuth,
  authMiddleware,
  new ChatController().createChat
);

export default routes;
