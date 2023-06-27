import { LikeController } from "../Controllers/LikeController";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";

const routes = Router();

routes.post(
  "/like/:postId",
  isAuth,
  authMiddleware,
  new LikeController().likePost
);

routes.delete(
  "/dislike/:postId",
  isAuth,
  authMiddleware,
  new LikeController().dislikePost
);
routes.get(
  "/isLiked/:postId",
  isAuth,
  authMiddleware,
  new LikeController().checkIfLiked
);

export default routes;
