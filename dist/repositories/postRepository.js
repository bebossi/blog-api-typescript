"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Post_1 = require("../entities/Post");
exports.postRepository = dataSource_1.AppDataSource.getRepository(Post_1.Post);
