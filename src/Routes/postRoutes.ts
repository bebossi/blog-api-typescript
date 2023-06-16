import { Router } from "express";
import { PostController } from "../Controllers/PostController";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";

const routes = Router();

routes.get(
  "/post/:postId",
  isAuth,
  authMiddleware,
  new PostController().getPost
);
routes.get(
  "/userProfile/:userId",
  isAuth,
  authMiddleware,
  new PostController().userProfile
);
routes.get(
  "/profilePost",
  isAuth,
  authMiddleware,
  new PostController().currentUserProfile
);
routes.post("/post", isAuth, authMiddleware, new PostController().createPost);
routes.put(
  "/post/:postId",
  isAuth,
  authMiddleware,
  new PostController().updatePost
);
routes.delete(
  "/post/:postId",
  isAuth,
  authMiddleware,
  new PostController().deletePost
);
routes.get("/feed", new PostController().feed);
export default routes;
