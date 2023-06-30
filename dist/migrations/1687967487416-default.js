"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1687967487416 = void 0;
class Default1687967487416 {
    constructor() {
        this.name = "Default1687967487416";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Likes" DROP CONSTRAINT "FK_f1893ea82bd69980e2667505fca"`);
            yield queryRunner.query(`ALTER TABLE "Likes" ADD CONSTRAINT "FK_likes_postId" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Likes" DROP CONSTRAINT "FK_likes_postId"`);
            yield queryRunner.query(`ALTER TABLE "Likes" ADD CONSTRAINT "FK_f1893ea82bd69980e2667505fca" FOREIGN KEY ("postId") REFERENCES "Posts"("id")`);
        });
    }
}
exports.Default1687967487416 = Default1687967487416;
