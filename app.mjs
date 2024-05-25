import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
const app = express();

const hostname = "localhost";
const port = 5000;
//middleware
app.use(cors());
app.use(express.json()); // req.body

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
      url: "http://localhost:5000/",
    },
    contact: {
      name: "WebDevAdmin",
      url: "http://localhost:5000/",
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

const swaggerSpecs = swaggerJsondoc(options);
//swagger document
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  })
);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
