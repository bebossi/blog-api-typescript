import { Follow } from "./../entities/Follow";
import { AppDataSource } from "../config/dataSource";

export const followRepository = AppDataSource.getRepository(Follow);
