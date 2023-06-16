import express from "express";
import { AppDataSource } from "./config/dataSource";
import routes from "./Routes";
import cors from "cors";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT_EXPRESS, () => {
    console.log("listening");
  });
});
