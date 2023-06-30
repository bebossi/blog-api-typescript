"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./config/dataSource");
const Routes_1 = __importDefault(require("./Routes"));
const cors_1 = __importDefault(require("cors"));
dataSource_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
    }));
    app.use(express_1.default.json());
    app.use(Routes_1.default);
    return app.listen(process.env.PORT_EXPRESS, () => {
        console.log("listening");
    });
});
