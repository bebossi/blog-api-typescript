import { AppDataSource } from "../config/dataSource";
import { Chat } from "../entities/Chat";
export const chatRepository = AppDataSource.getRepository(Chat);
