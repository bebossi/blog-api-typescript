import postRoutes from "./postRoutes";
import bodyparser from "body-parser";
import userRoutes from "./userRoutes";
import express from "express";
import commentRoutes from "./commentRoutes";
import followRoutes from "./followRoutes";
import likeRoutes from "./likeRoutes";
import { uploadImageRouter } from "./uploadImages.routes";
import searchRoutes from "./searchRoutes";
import chatRoutes from "./chatRoutes";
import messageRoutes from "./messageRoutes";

const app = express();

app.use(bodyparser.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(followRoutes);
app.use(uploadImageRouter);
app.use(likeRoutes);
app.use(searchRoutes);
app.use(chatRoutes);
app.use(messageRoutes);

export default app;
