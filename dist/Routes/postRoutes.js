"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../Controllers/PostController");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurretnUser_1 = require("../middlewares/attachCurretnUser");
const routes = (0, express_1.Router)();
routes.get("/post/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().getPost);
routes.get("/userProfile/:userId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().userProfile);
routes.get("/profilePost", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().currentUserProfile);
routes.post("/post", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().createPost);
routes.put("/post/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().updatePost);
routes.delete("/post/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().deletePost);
routes.get("/feed", isAuth_1.default, attachCurretnUser_1.authMiddleware, new PostController_1.PostController().feed);
exports.default = routes;
