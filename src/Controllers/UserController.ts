import { User } from "./../entities/User";
import { userRepository } from "./../repositories/userRepository";
import { postRepository } from "../repositories/postRepository";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.config";
import { Like, ILike } from "typeorm";

export class UserController {
  async signUp(req: Request, res: Response) {
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    try {
      const { userName, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = userRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      await userRepository.save(newUser);
      //DELETAR A SENHA DO JSON

      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findOne({ where: { email: email } });

      if (!user) {
        return res.status(401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401);
      }
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          userName: user.userName,
          email: user.email,
        },
        token: token,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getMyFollowers(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number;

      const followers = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followers", "follow")
        .where("follow.followingId = :userId", { userId })
        .getMany();
      const followings = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followings", "follow")
        .where("follow.followerId = :userId", { userId })
        .getMany();

      const isFollowFollower = followers.filter((follower) =>
        followings.some((following) => following.id === follower.id)
      );
      console.log(isFollowFollower);
      return res.status(200).json({ followers, isFollowFollower });
    } catch (err) {
      console.log(err);
    }
  }

  async getMyFollowings(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number;

      const followings = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followings", "follow")
        .where("follow.followerId = :userId", { userId })
        .getMany();

      return res.status(200).json(followings);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number | undefined;

      const user = await userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      user.userName = req.body.userName;
      user.email = req.body.email;
      user.imageUrl = req.body.imageUrl;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      user.password = hashedPassword;

      await userRepository.save(user);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const currentUser = req.currentUser?.id as User | number;

      const followers = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followers", "follow")
        .where("follow.followingId = :userId", { userId })
        .getMany();

      const followingsCurrentUser = await userRepository
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
    } catch (err) {
      console.log(err);
    }
  }
  async getFollowings(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const currentUser = req.currentUser?.id as User | number;

      const followingsUser = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followings", "follow")
        .where("follow.followerId = :userId", { userId })
        .getMany();

      const followingsCurrentUser = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followings", "follow")
        .where("follow.followerId = :currentUser", { currentUser })
        .getMany();

      const sameFollowings = followingsUser.filter((following) => {
        return followingsCurrentUser.some((myFollowing) => {
          return myFollowing.id === following.id;
        });
      });

      return res.status(200).json({ followingsUser, sameFollowings });
    } catch (err) {
      console.log(err);
    }
  }

  async searchBar(req: Request, res: Response) {
    try {
      // const searchQuery = req.query as unknown as string;

      const searchQuery = decodeURIComponent(req.query.query as string);

      const userSearchResults = await userRepository.find({
        where: [
          {
            userName: ILike(`%${searchQuery}%`),
          },
        ],
      });

      const postSearchResults = await postRepository.find({
        where: [{ content: ILike(`%${searchQuery}%`) }],
        relations: ["comments", "userId"],
      });

      const searchResults = {
        users: userSearchResults,
        posts: postSearchResults,
      };
      console.log(searchQuery);
      console.log(searchResults);

      return res.status(200).json(searchResults);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred during the search." });
    }
  }
}
