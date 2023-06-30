"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageRouter = void 0;
const cloudinary_config_1 = require("../config/cloudinary.config");
const express_1 = require("express");
const uploadImageRouter = (0, express_1.Router)();
exports.uploadImageRouter = uploadImageRouter;
uploadImageRouter.post("/uploadImage", cloudinary_config_1.uploadImg.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
    }
    const { filename, path, size } = req.file;
    return res.json({ filename, path, size });
});
