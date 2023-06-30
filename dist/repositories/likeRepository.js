"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Like_1 = require("../entities/Like");
exports.likeRepository = dataSource_1.AppDataSource.getRepository(Like_1.Like);
