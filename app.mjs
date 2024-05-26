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
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/component"));
app.use(express.static(__dirname + "/script"));

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Classroom API",
      version: "1.0.0",
      description: "API for managing classroom",
    },
    license: {
      name: "Classroom",
      url: "http://localhost:3000/",
    },
    contact: {
      name: "WebDevAdmin",
      url: "http://localhost:3000/",
      email: "tgldrchmg0730@gmail.com",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./app.mjs"],
};

const swaggerSpecs = swaggerJsdoc(options);
//swagger document
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  })
);

app.use("/", classRoutes);
app.use("/private", privateRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
