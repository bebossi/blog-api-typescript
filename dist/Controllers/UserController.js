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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("./../repositories/userRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_config_1 = require("../config/jwt.config");
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = 10;
            const salt = yield bcryptjs_1.default.genSalt(SALT_ROUNDS);
            try {
                const { userName, email, password } = req.body;
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const newUser = userRepository_1.userRepository.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
                yield userRepository_1.userRepository.save(newUser);
                //DELETAR A SENHA DO JSON
                return res.status(201).json(newUser);
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userRepository_1.userRepository.findOne({
                    where: { email: email },
                    select: ["id", "password", "email", "userName"],
                });
                if (!user) {
                    return res.status(401);
                }
                const isValidPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
                if (!isValidPassword) {
                    return res.status(401);
                }
                const token = (0, jwt_config_1.generateToken)(user);
                return res.status(200).json({
                    user: {
                        userName: user.userName,
                        email: user.email,
                    },
                    token: token,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    getMyFollowers(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const followers = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followers", "follow")
                    .where("follow.followingId = :userId", { userId })
                    .getMany();
                const followings = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followings", "follow")
                    .where("follow.followerId = :userId", { userId })
                    .getMany();
                const isFollowFollower = followers.filter((follower) => followings.some((following) => following.id === follower.id));
                console.log(isFollowFollower);
                return res.status(200).json({ followers, isFollowFollower });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getMyFollowings(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const followings = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followings", "follow")
                    .select(["user.id", "user.imageUrl", "user.userName"])
                    .where("follow.followerId = :userId", { userId })
                    .getMany();
                return res.status(200).json(followings);
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    updateUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const user = yield userRepository_1.userRepository.findOne({
                    where: { id: userId },
                });
                if (!user) {
                    return res.status(404).json({ error: "user not found" });
                }
                user.userName = req.body.userName;
                user.email = req.body.email;
                user.imageUrl = req.body.imageUrl;
                yield userRepository_1.userRepository.save(user);
                return res.status(200).json(user);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getFollowers(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const currentUser = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const followers = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followers", "follow")
                    .where("follow.followingId = :userId", { userId })
                    .getMany();
                const followingsCurrentUser = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followings", "follow")
                    .where("follow.followerId = :currentUser", { currentUser })
                    .getMany();
                const followHisFollowers = followers.filter((follower) => {
                    return followingsCurrentUser.some((following) => {
                        return follower.id === following.id;
                    });
                });
                return res.status(200).json({ followers, followHisFollowers });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getFollowings(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const currentUser = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const followingsUser = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followings", "follow")
                    .where("follow.followerId = :userId", { userId })
                    .getMany();
                const followingsCurrentUser = yield userRepository_1.userRepository
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.followings", "follow")
                    .where("follow.followerId = :currentUser", { currentUser })
                    .getMany();
                const sameFollowings = followingsUser.filter((following) => {
                    return followingsCurrentUser.some((myFollowing) => {
                        return myFollowing.id === following.id;
                    });
                });
                return res
                    .status(200)
                    .json({ followingsUser, sameFollowings, followingsCurrentUser });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.UserController = UserController;
