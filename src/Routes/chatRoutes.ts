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

routes.get("/chats", isAuth, authMiddleware, new ChatController().getChats);
routes.get(
  "/chat/:userId",
  isAuth,
  authMiddleware,
  new ChatController().getChat
);

routes.delete(
  "/deleteChat/:chatId",
  isAuth,
  authMiddleware,
  new ChatController().deleteChat
);

export default routes;
