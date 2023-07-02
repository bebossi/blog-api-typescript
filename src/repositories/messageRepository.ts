import { AppDataSource } from "../config/dataSource";
import { Message } from "../entities/Message";
export const messageRepository = AppDataSource.getRepository(Message);
