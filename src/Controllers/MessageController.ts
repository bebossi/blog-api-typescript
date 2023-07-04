import { Request, Response } from "express";
import { chatRepository } from "../repositories/chatRepository";
import { messageRepository } from "../repositories/messageRepository";
import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";
import { Chat } from "../entities/Chat";

export class MessageController {
  async sendMessage(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const { userId, chatId } = req.params;

      const currentUser = await userRepository.findOne({
        where: { id: currentUserId },
        select: ["id", "userName", "imageUrl"],
      });
      const user = await userRepository.findOne({
        where: { id: Number(userId) },
        select: ["id", "userName", "imageUrl"],
      });

      const chat = await chatRepository.findOne({
        where: { id: Number(chatId) },
        relations: ["users"],
      });
      if (!chat?.users.some((user) => user.id === currentUserId)) {
        return res.status(403).json({
          error: "You are not authorized to send a message in this chat.",
        });
      }
      console.log(chat);

      const message = messageRepository.create();

      message.senderId = currentUser as User;
      message.recipientId = user as User;
      message.chatId = chat as Chat;
      message.message = req.body.message;

      await messageRepository.save(message);

      return res.status(200).json(message);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async deleteMessage(req: Request, res: Response) {}
}
