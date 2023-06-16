import { FollowController } from "./../Controllers/FollowController";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";

const routes = Router();

routes.post(
  "/followUser/:followingId",
  isAuth,
  authMiddleware,
  new FollowController().followUser
);
routes.delete(
  "/unfollowUser/:followingId",
  new FollowController().unfollowUser
);

export default routes;
