import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);
