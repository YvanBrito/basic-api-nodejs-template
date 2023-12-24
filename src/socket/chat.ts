import { Server } from "node:http";
import { Server as ServerSocket } from "socket.io";

class ChatServer {
  private io: ServerSocket;
  constructor(server: Server) {
    this.io = new ServerSocket(server);
  }
  listen() {
    this.io.on("connection", (socket) => {
      socket.on("chat message", (msg) => {
        this.io.emit("chat message", msg);
      });
    });
  }
}

const createChatServer = (server: Server) => new ChatServer(server);

export { createChatServer };
