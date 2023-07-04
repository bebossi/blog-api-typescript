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

  async getChats(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;

      const currentUser = await userRepository.findOne({
        where: { id: currentUserId },
        relations: ["chats", "chats.users"],
      });

      if (!currentUser) {
        throw new Error("Invalid user data");
      }

      // const chats = currentUser.chats;

      const chats = currentUser.chats.map((chat) => ({
        ...chat,
        users: chat.users.filter((user) => user.id !== currentUserId),
      }));

      return res.status(200).json(chats);
    } catch (err) {
      console.log(err);
    }
  }

  async getChat(req: Request, res: Response) {
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

      const chat = await chatRepository
        .createQueryBuilder("chat")
        .leftJoinAndSelect("chat.users", "user")
        .innerJoin(
          "chat.users",
          "currentUser",
          "currentUser.id = :currentUserId",
          { currentUserId }
        )
        .where("user.id = :userId", { userId })
        .leftJoinAndSelect("chat.messages", "message")
        .leftJoin("message.senderId", "senderId")
        .addSelect(["senderId.id", "senderId.userName"]) // Add the columns you want to select from the sender entity
        .leftJoin("message.recipientId", "recipientId")
        .addSelect(["recipientId.id", "recipientId.userName"]) // Add the columns you want to select from the recipient entity
        .getOne();

      return res.status(200).json(chat);
    } catch (err) {
      console.log(err);
    }
  }
}
