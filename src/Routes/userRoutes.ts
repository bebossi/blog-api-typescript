import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";

const routes = Router();

routes.post("/user/signup", new UserController().signUp);
routes.post("/user/login", new UserController().login);
routes.get(
  "/followers",
  isAuth,
  authMiddleware,
  new UserController().getMyFollowers
);
routes.get(
  "/followings",
  isAuth,
  authMiddleware,
  new UserController().getMyFollowings
);
routes.put(
  "/updateUser",
  isAuth,
  authMiddleware,
  new UserController().updateUser
);

routes.get(
  "/followers/:userId",
  isAuth,
  authMiddleware,
  new UserController().getFollowers
);
routes.get(
  "/followings/:userId",
  isAuth,
  authMiddleware,
  new UserController().getFollowings
);

routes.get(`/search`, isAuth, authMiddleware, new UserController().searchBar);

export default routes;
