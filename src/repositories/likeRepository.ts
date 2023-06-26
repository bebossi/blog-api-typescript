import { AppDataSource } from "../config/dataSource";
import { Like } from "../entities/Like";

export const likeRepository = AppDataSource.getRepository(Like);
