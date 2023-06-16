import { commentRepository } from "../repositories/commentRepository";
import { Comment } from "../entities/Comment";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { postRepository } from "../repositories/postRepository";

export class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number;
      const { comment } = req.body;
      const { postId } = req.params;

      const newComment = commentRepository.create({
        ...req.body,
        userId: userId,
        postId: Number(postId),
      });

      await commentRepository.save(newComment);

      return res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { commentId, postId } = req.params;
      const userId = req.currentUser?.id as number;

      const updateComment = await commentRepository.findOne({
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

      commentRepository.save(updateComment);

      return res.status(200).json(updateComment);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId, postId } = req.params;
      const userId = req.currentUser?.id as number;

      const deleteComment = await commentRepository.findOne({
        where: {
          id: Number(commentId),
          postId: { id: Number(postId) },
          userId: { id: userId },
        },
      });

      await commentRepository.delete(deleteComment as Comment);

      return res.status(200).json(deleteComment);
    } catch (err) {
      console.log(err);
    }
  }
}
