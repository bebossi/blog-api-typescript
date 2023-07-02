import { Request, Response } from "express";
import { chatRepository } from "../repositories/chatRepository";
import { userRepository } from "../repositories/userRepository";

export class ChatController {
  async createChat(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { userId } = req.params;

      const currentUser = await userRepository.findOne({
        where: { id: currentUserId },
      });
      const user = await userRepository.findOne({
        where: { id: Number(userId) },
      });

      if (!currentUser || !user) {
        throw new Error("Invalid user data");
      }

      const chat = chatRepository.create();
      chat.users = [currentUser, user];

      await chatRepository.save(chat);

      return res.status(201).json(chat);
    } catch (err) {
      console.log(err);
    }
  }
}
