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
exports.PostController = void 0;
const postRepository_1 = require("../repositories/postRepository");
const userRepository_1 = require("../repositories/userRepository");
const followRepository_1 = require("../repositories/followRepository");
class PostController {
    createPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, imageUrl } = req.body;
                const newPost = postRepository_1.postRepository.create({
                    content: content,
                    imageUrl: imageUrl,
                    userId: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
                });
                yield postRepository_1.postRepository.save(newPost);
                return res.status(201).json(newPost);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    currentUserProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const currentUserProfile = yield userRepository_1.userRepository.findOne({
                    where: { id: userId },
                    relations: [
                        "posts",
                        "posts.comments",
                        "posts.comments.userId",
                        "posts.likes",
                        "followers",
                        "followings",
                        "likes.postId.comments.userId",
                        "likes.postId.userId",
                    ],
                    select: ["id", "userName", "email", "imageUrl"],
                });
                return res.status(200).json(currentUserProfile);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    updatePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const updatePost = yield postRepository_1.postRepository.findOne({
                    where: { id: Number(postId), userId: { id: userId } },
                });
                if (!updatePost) {
                    return res.status(404).json({ error: "Post not found" });
                }
                updatePost.content = req.body.content;
                updatePost.imageUrl = req.body.imageUrl;
                yield postRepository_1.postRepository.save(updatePost);
                return res.status(200).json(updatePost);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    deletePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const deletePost = yield postRepository_1.postRepository.findOne({
                    where: { id: Number(postId), userId: { id: userId } },
                });
                yield postRepository_1.postRepository.delete(deletePost);
                return res.status(200).json(deletePost);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    userProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const currentUser = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const userProfile = yield userRepository_1.userRepository.findOne({
                    where: { id: Number(userId) },
                    relations: [
                        "posts",
                        "posts.comments",
                        "posts.comments.userId",
                        "followers",
                        "followings",
                        "likes.postId.comments.userId",
                        "likes.postId.userId",
                    ],
                    select: ["id", "userName", "email"],
                });
                let isFollowing = false;
                const existingFollow = yield followRepository_1.followRepository.findOne({
                    where: {
                        followerId: { id: currentUser },
                        followingId: { id: Number(userId) },
                    },
                });
                if (existingFollow) {
                    isFollowing = true;
                }
                return res.status(200).json({ userProfile, isFollowing });
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const post = yield postRepository_1.postRepository.findOne({
                    where: { id: Number(postId) },
                    relations: ["comments", "comments.userId", "userId"],
                });
                return res.status(200).json(post);
            }
            catch (err) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    }
    feed(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const followings = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .select(["user.id"])
                    .leftJoinAndSelect("user.followings", "follow")
                    .where("follow.followerId = :userId", { userId })
                    .getMany();
                const feed = yield postRepository_1.postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.userId", "user")
                    .leftJoinAndSelect("post.comments", "comment")
                    .leftJoinAndSelect("comment.userId", "commentUser")
                    .where("user.id IN (:...followings)", {
                    followings: followings.map((following) => following.id),
                })
                    .getMany();
                return res.status(200).json(feed);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.PostController = PostController;
