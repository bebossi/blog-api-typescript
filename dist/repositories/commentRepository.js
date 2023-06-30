"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const Comment_1 = require("./../entities/Comment");
const dataSource_1 = require("../config/dataSource");
exports.commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
