"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const likeRepository_1 = require("../repositories/likeRepository");
class LikeController {
    likePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const like = likeRepository_1.likeRepository.create({
                    userId: { id: userId },
                    postId: { id: Number(postId) },
                });
                console.log(like);
                yield likeRepository_1.likeRepository.save(like);
                return res.status(201).json(like);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    dislikePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const dislike = yield likeRepository_1.likeRepository.findOne({
                    where: {
                        userId: { id: userId },
                        postId: { id: Number(postId) },
                    },
                });
                yield likeRepository_1.likeRepository.delete(dislike);
                return res.status(200).json(dislike);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    checkIfLiked(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const postLiked = yield likeRepository_1.likeRepository.findOne({
                    where: {
                        userId: { id: userId },
                        postId: { id: Number(postId) },
                    },
                    relations: ["postId"],
                });
                let isLiked = false;
                if (postLiked) {
                    isLiked = true;
                }
                return res.status(200).json({ isLiked, postLiked });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.LikeController = LikeController;
