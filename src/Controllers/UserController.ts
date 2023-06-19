import { userRepository } from "./../repositories/userRepository";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.config";

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

  async getFollowers(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number;

      // const user = await userRepository.findOne({
      //   where: { id: userId },
      //   relations: ["followers", "followers.followerId"],
      //   select: ["followers"],
      // });
      // const followers = user?.followers.map((follow) => follow.followerId);
      const followers = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.followers", "follow")
        .where("follow.followingId = :userId", { userId })
        .getMany();

      return res.status(200).json(followers);
    } catch (err) {
      console.log(err);
    }
  }

  async getFollowings(req: Request, res: Response) {
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

      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      user.password = hashedPassword;

      await userRepository.save(user);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}
