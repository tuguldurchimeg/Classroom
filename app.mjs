import express from "express";
import session from "express-session";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import classRoutes from "./public/routes.mjs";
import privateRoutes from "./private/routes.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = "localhost";
const port = 3000;
//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // req.body
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "components")));
app.use(express.static(path.join(__dirname, "script")));

app.use("/", classRoutes);
app.use("/auth", privateRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/:htmlFile", (req, res) => {
  const { htmlFile } = req.params;
  res.sendFile(path.join(__dirname, `${htmlFile}`));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
