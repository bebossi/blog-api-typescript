import { userRepository } from "./../repositories/userRepository";
import { postRepository } from "../repositories/postRepository";
import { Request, Response } from "express";
import { Like, ILike } from "typeorm";
import { searchRepository } from "../repositories/searchRepository";

export class SearchController {
  async searchBar(req: Request, res: Response) {
    try {
      const currentUser = req.currentUser?.id as number;
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

      const search = searchRepository.create({
        userId: { id: currentUser },
        search: searchQuery,
      });

      await searchRepository.save(search);

      return res.status(200).json(searchResults);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred during the search." });
    }
  }

  async getSearches(req: Request, res: Response) {
    try {
      const currentUser = req.currentUser?.id as number;

      const searches = await searchRepository.find({
        where: {
          userId: { id: currentUser },
        },
      });
      return res.status(200).json(searches);
    } catch (err) {
      console.log(err);
    }
  }
}
