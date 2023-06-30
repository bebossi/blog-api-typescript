"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    const { id, userName, email } = user;
    const signature = process.env.TOKEN_SIGN_SECRET;
    const expiration = "8h";
    return jsonwebtoken_1.default.sign({ id: user.id, userName, email }, signature, {
        expiresIn: expiration,
    });
}
exports.generateToken = generateToken;
