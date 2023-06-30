import { Search } from "./../entities/Searchhistory";
import { AppDataSource } from "../config/dataSource";

export const searchRepository = AppDataSource.getRepository(Search);
