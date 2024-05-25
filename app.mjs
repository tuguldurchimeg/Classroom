import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import pool from "./db.mjs";
const app = express();

const hostname = "localhost";
const port = 3000;
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

const swaggerSpecs = swaggerJsondoc(options);
//swagger document
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  })
);

app.post("/classes", (req, res) => {
  const { room_id, roomNo, building, type, capacity, projector } = req.body;
  pool.query(
    "INSERT INTO classes(room_id,roomNo,building,type,capacity, projector) VALUES($1,$2,$3,$4,$5,$6)",
    [room_id, roomNo, building, type, capacity, projector],
    (err, result) => {
      if (!err) {
        res.status(201).send(result.rows);
      } else {
        res.status(500).send(err.message);
      }
    }
  );
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
