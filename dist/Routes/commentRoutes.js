"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = require("../Controllers/CommentController");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurretnUser_1 = require("../middlewares/attachCurretnUser");
const routes = (0, express_1.Router)();
routes.post("/comment/:postId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new CommentController_1.CommentController().createComment);
routes.put("/comment/:postId/:commentId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new CommentController_1.CommentController().updateComment);
routes.delete("/comment/:postId/:commentId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new CommentController_1.CommentController().deleteComment);
exports.default = routes;
