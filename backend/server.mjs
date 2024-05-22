import { createServer } from "node:http";
import pool from "./db.mjs";
import express from "express";
const app = express();

//middleware
app.use(cors());
app.use(express.json()); // req.body

const hostname = "127.0.0.1";
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
