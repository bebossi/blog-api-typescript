import express from "express";
import { AppDataSource } from "./config/dataSource";
import routes from "./Routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

AppDataSource.initialize().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());
  app.use(routes);

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("getChat", (chat) => {
      socket.join(chat);
      console.log("chat", chat);
    });

    socket.on("sendMessage", (data) => {
      socket.to(data.sentMessage.chatId.id).emit("receivedMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });

  return server.listen(process.env.PORT_EXPRESS, () => {
    console.log("Server listening on port", process.env.PORT_EXPRESS);
  });
});
