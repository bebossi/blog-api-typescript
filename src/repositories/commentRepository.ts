import { Comment } from "./../entities/Comment";
import { AppDataSource } from "../config/dataSource";

export const commentRepository = AppDataSource.getRepository(Comment);
