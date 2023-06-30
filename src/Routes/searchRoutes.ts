import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurretnUser";
import { SearchController } from "../Controllers/SearchController";

const routes = Router();

routes.get(`/search`, isAuth, authMiddleware, new SearchController().searchBar);
routes.get(
  `/searchHistory`,
  isAuth,
  authMiddleware,
  new SearchController().getSearches
);
export default routes;
