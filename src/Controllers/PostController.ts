import { Request, Response } from "express";
import { postRepository } from "../repositories/postRepository";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { userRepository } from "../repositories/userRepository";
import { followRepository } from "../repositories/followRepository";

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

      const currentUserProfile = await userRepository.findOne({
        where: { id: userId },
        relations: [
          "posts",
          "posts.comments",
          "posts.comments.userId",
          "followers",
          "followings",
        ],
        select: ["id", "userName", "email", "imageUrl", "password"],
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
      const currentUser = req.currentUser?.id as number;

      const userProfile = await userRepository.findOne({
        where: { id: Number(userId) },
        relations: [
          "posts",
          "posts.comments",
          "posts.comments.userId",
          "followers",
          "followings",
        ],
        select: ["id", "userName", "email"],
      });

      let isFollowing = false;

      const existingFollow = await followRepository.findOne({
        where: {
          followerId: { id: currentUser },
          followingId: { id: Number(userId) },
        },
      });
      if (existingFollow) {
        isFollowing = true;
      }

      return res.status(200).json({ userProfile, isFollowing });
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
      const userId = req.currentUser?.id as User | number;

      const followings = await userRepository
        .createQueryBuilder("user")
        .select(["user.id"])
        .leftJoinAndSelect("user.followings", "follow")
        .where("follow.followerId = :userId", { userId })
        .getMany();

      const feed = await postRepository
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.userId", "user")
        .leftJoinAndSelect("post.comments", "comment")
        .leftJoinAndSelect("comment.userId", "commentUser")
        .where("user.id IN (:...followings)", {
          followings: followings.map((following) => following.id),
        })
        .getMany();

      return res.status(200).json(feed);
    } catch (err) {
      console.log(err);
    }
  }
}
