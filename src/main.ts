import "dotenv/config";
import "reflect-metadata";
import { createServer } from "node:http";
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import { createChatServer } from "./socket/chat";
import { HttpErrorResponse } from "./utils/errors";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpErrorResponse) {
    const { statusCode, message } = err as HttpErrorResponse;
    res.status(statusCode).json({
      statusCode,
      message,
    });
    return;
  }
  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
  next(err);
}

const PORT = process.env.NODE_LOCAL_PORT;

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(routes);
app.use(errorHandler);

const server = createServer(app);

createChatServer(server).listen();

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
