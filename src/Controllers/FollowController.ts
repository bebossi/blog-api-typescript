import { Request, Response } from "express";
import { followRepository } from "../repositories/followRepository";
import { Follow } from "../entities/Follow";
import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";

export class FollowController {
  async followUser(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number | User;
      const { followingId } = req.params as {
        followingId: string | User | number;
      };

      const existingFollow = await followRepository.findOne({
        where: {
          followerId: { id: userId as number },
          followingId: { id: Number(followingId) },
        },
      });

      if (existingFollow) {
        console.log("You already follow this user");
        return res
          .status(400)
          .json({ success: false, message: "You already follow this user" });
      }

      const followUser = followRepository.create();
      followUser.followerId = userId as User;
      followUser.followingId = followingId as User;

      //   const followUser = followRepository.create({
      //     followerId: { id: userId },
      //     followingId: { id: Number(followingId) },
      //   });

      await followRepository.save(followUser);
      console.log("Successfully followed user!");
      return res.status(200).json(followUser);
    } catch (err) {
      console.log(err);
    }
  }

  async unfollowUser(req: Request, res: Response) {
    try {
      const { followingId } = req.params;
      const userId = req.currentUser?.id;

      const unfollowUser = await followRepository.findOne({
        where: {
          followerId: { id: userId },
          followingId: { id: Number(followingId) },
        },
      });

      await followRepository.delete(unfollowUser as Follow);

      return res.status(200).json(unfollowUser);
    } catch (err) {
      console.log(err);
    }
  }
}
