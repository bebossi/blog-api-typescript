import { AppDataSource } from "../config/dataSource";
import { Post } from "../entities/Post";

export const postRepository = AppDataSource.getRepository(Post);
