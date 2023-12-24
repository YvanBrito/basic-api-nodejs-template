import { createServer } from "node:http";
import express from "express";
import routes from "./routes";
import { createChatServer } from "./socket/chat";

const PORT = 8001;

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(routes);

const server = createServer(app);

createChatServer(server).listen();

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
