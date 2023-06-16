import { Router } from "express";
import { CommentController } from "../Controllers/CommentController";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";

const routes = Router();

routes.post(
  "/comment/:postId",
  isAuth,
  authMiddleware,
  new CommentController().createComment
);
routes.put(
  "/comment/:postId/:commentId",
  isAuth,
  authMiddleware,
  new CommentController().updateComment
);
routes.delete(
  "/comment/:postId/:commentId",
  isAuth,
  authMiddleware,
  new CommentController().deleteComment
);

export default routes;
