import { Like } from "../entities/Like";
import { User } from "../entities/User";
import { likeRepository } from "../repositories/likeRepository";
import { Request, Response } from "express";

export class LikeController {
  async likePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.currentUser?.id as number | undefined;

      console.log(userId, postId);

      const like = likeRepository.create({
        userId: { id: userId },
        postId: { id: Number(postId) },
      });
      console.log(like);

      await likeRepository.save(like);

      return res.status(201).json(like);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async dislikePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.currentUser?.id as number | undefined;

      const dislike = await likeRepository.findOne({
        where: {
          userId: { id: userId },
          postId: { id: Number(postId) },
        },
      });

      await likeRepository.delete(dislike as Like);

      return res.status(200).json(dislike);
    } catch (err) {
      console.log(err);
    }
  }
}
