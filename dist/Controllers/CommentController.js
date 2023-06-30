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
exports.CommentController = void 0;
const commentRepository_1 = require("../repositories/commentRepository");
class CommentController {
    createComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const { comment } = req.body;
                const { postId } = req.params;
                const newComment = commentRepository_1.commentRepository.create(Object.assign(Object.assign({}, req.body), { userId: userId, postId: Number(postId) }));
                yield commentRepository_1.commentRepository.save(newComment);
                return res.status(200).json(newComment);
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    updateComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const updateComment = yield commentRepository_1.commentRepository.findOne({
                    where: {
                        postId: { id: Number(postId) },
                        userId: { id: userId },
                        id: Number(commentId),
                    },
                });
                if (!updateComment) {
                    return res.status(404).json({ error: "Comment not found" });
                }
                updateComment.comment = req.body.comment;
                commentRepository_1.commentRepository.save(updateComment);
                return res.status(200).json(updateComment);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const deleteComment = yield commentRepository_1.commentRepository.findOne({
                    where: {
                        id: Number(commentId),
                        postId: { id: Number(postId) },
                        userId: { id: userId },
                    },
                });
                yield commentRepository_1.commentRepository.delete(deleteComment);
                return res.status(200).json(deleteComment);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.CommentController = CommentController;
