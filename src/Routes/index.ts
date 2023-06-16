import postRoutes from "./postRoutes";
import bodyparser from "body-parser";
import userRoutes from "./userRoutes";
import express from "express";
import commentRoutes from "./commentRoutes";
import followRoutes from "./followRoutes";

const app = express();

app.use(bodyparser.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(followRoutes);

export default app;
