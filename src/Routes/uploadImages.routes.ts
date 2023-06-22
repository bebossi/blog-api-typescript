import { Request, Response } from "express";
import { uploadImg } from "../config/cloudinary.config";
import { Router } from "express";

const uploadImageRouter = Router();

uploadImageRouter.post(
  "/uploadImage",
  uploadImg.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { filename, path, size } = req.file;

    return res.json({ filename, path, size });
  }
);

export { uploadImageRouter };
