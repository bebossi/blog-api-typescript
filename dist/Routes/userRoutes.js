"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../Controllers/UserController");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurretnUser_1 = require("../middlewares/attachCurretnUser");
const routes = (0, express_1.Router)();
routes.post("/user/signup", new UserController_1.UserController().signUp);
routes.post("/user/login", new UserController_1.UserController().login);
routes.get("/followers", isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().getMyFollowers);
routes.get("/followings", isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().getMyFollowings);
routes.put("/updateUser", isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().updateUser);
routes.get("/followers/:userId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().getFollowers);
routes.get("/followings/:userId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().getFollowings);
routes.get(`/search`, isAuth_1.default, attachCurretnUser_1.authMiddleware, new UserController_1.UserController().searchBar);
exports.default = routes;
