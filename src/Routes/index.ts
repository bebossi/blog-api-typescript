import postRoutes from "./postRoutes";
import bodyparser from "body-parser";
import userRoutes from "./userRoutes";
import express from "express";
import commentRoutes from "./commentRoutes";
import followRoutes from "./followRoutes";
import { uploadImageRouter } from "./uploadImages.routes";

const app = express();

app.use(bodyparser.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(followRoutes);
app.use(uploadImageRouter);

export default app;
