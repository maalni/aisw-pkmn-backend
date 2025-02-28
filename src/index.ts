import * as dotenv from "dotenv";
import { handleImage } from "./handlers.js";
import * as http from "node:http";
import express, { Express } from "express";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(express.json());

const server = http.createServer(app);

app.get("/api/health", async (_, res) => {
  res.send("ok");
});

app.post("/api/image", handleImage);

// Start the HTTP server
server.listen(port, () => console.log(`Listening on port ${port}`));
