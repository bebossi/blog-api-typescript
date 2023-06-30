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
exports.FollowController = void 0;
const followRepository_1 = require("../repositories/followRepository");
class FollowController {
    followUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const { followingId } = req.params;
                const existingFollow = yield followRepository_1.followRepository.findOne({
                    where: {
                        followerId: { id: userId },
                        followingId: { id: Number(followingId) },
                    },
                });
                if (existingFollow) {
                    console.log("You already follow this user");
                    return res.status(400).json({
                        success: false,
                        message: "You already follow this user",
                        existingFollow: true,
                    });
                }
                const followUser = followRepository_1.followRepository.create();
                followUser.followerId = userId;
                followUser.followingId = followingId;
                yield followRepository_1.followRepository.save(followUser);
                console.log("Successfully followed user!");
                return res.status(200).json(followUser);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    unfollowUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followingId } = req.params;
                const currentUser = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const unfollowUser = yield followRepository_1.followRepository.findOne({
                    where: {
                        followerId: { id: currentUser },
                        followingId: { id: Number(followingId) },
                    },
                });
                yield followRepository_1.followRepository.delete(unfollowUser);
                return res.status(200).json(unfollowUser);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.FollowController = FollowController;
