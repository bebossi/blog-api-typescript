"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeController_1 = require("../Controllers/LikeController");
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurretnUser_1 = require("../middlewares/attachCurretnUser");
const routes = (0, express_1.Router)();
routes.post("/like/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new LikeController_1.LikeController().likePost);
routes.delete("/dislike/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new LikeController_1.LikeController().dislikePost);
routes.get("/isLiked/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new LikeController_1.LikeController().checkIfLiked);
exports.default = routes;
