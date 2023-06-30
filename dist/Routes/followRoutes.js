"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowController_1 = require("./../Controllers/FollowController");
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurretnUser_1 = require("../middlewares/attachCurretnUser");
const routes = (0, express_1.Router)();
routes.post("/followUser/:followingId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new FollowController_1.FollowController().followUser);
routes.delete("/unfollowUser/:followingId", isAuth_1.default, attachCurretnUser_1.authMiddleware, new FollowController_1.FollowController().unfollowUser);
exports.default = routes;
