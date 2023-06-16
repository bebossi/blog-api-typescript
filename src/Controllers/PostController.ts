import { Request, Response } from "express";
import { postRepository } from "../repositories/postRepository";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { userRepository } from "../repositories/userRepository";

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { content, imageUrl } = req.body;

      const newPost = postRepository.create({
        content: content as string,
        imageUrl: imageUrl as string,
        userId: req.currentUser?.id as User | undefined,
      });

      await postRepository.save(newPost);

      return res.status(201).json(newPost);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async currentUserProfile(req: Request, res: Response) {
    try {
      const userId = req.currentUser?.id as number | undefined;

      const currentUserProfile = await postRepository.find({
        where: { userId: { id: userId } },
      });

      return res.status(200).json(currentUserProfile);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.currentUser?.id as number | undefined;

      const updatePost = await postRepository.findOne({
        where: { id: Number(postId), userId: { id: userId } },
      });

      if (!updatePost) {
        return res.status(404).json({ error: "Post not found" });
      }

      updatePost.content = req.body.content;
      updatePost.imageUrl = req.body.imageUrl;

      await postRepository.save(updatePost);

      return res.status(200).json(updatePost);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.currentUser?.id as number;

      const deletePost = await postRepository.findOne({
        where: { id: Number(postId), userId: { id: userId } },
      });

      await postRepository.delete(deletePost as Post);
      return res.status(200).json(deletePost);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async userProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const userProfile = await userRepository.findOne({
        where: { id: Number(userId) },
        relations: ["posts"],
        select: ["id", "userName", "email"],
      });

      return res.status(200).json(userProfile);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post = await postRepository.findOne({
        where: { id: Number(postId) },
        relations: ["comments", "comments.userId"],
      });
      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async feed(req: Request, res: Response) {
    try {
      const feed = await postRepository.find();

      return res.status(200).json(feed);
    } catch (err) {
      console.log(err);
    }
  }
}
