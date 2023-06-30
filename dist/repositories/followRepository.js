"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRepository = void 0;
const Follow_1 = require("./../entities/Follow");
const dataSource_1 = require("../config/dataSource");
exports.followRepository = dataSource_1.AppDataSource.getRepository(Follow_1.Follow);
