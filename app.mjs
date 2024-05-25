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
app.get("/classes", (req, res) => {
  pool.query("SELECT * FROM classes", (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
});
app.post("/time_slots", (req, res) => {
  const { room_id, garag, time } = req.body;
  console.log("Received data:", { room_id, garag, time });

  if (!room_id || !garag || !time) {
    const errorMessage = "Missing required fields";
    console.error(errorMessage);
    return res.status(400).send(errorMessage);
  }

  pool.query(
    "INSERT INTO time_slots(room_id, garag, time) VALUES($1, $2, $3)",
    [room_id, garag, time],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send(err.message);
      }
      console.log("Data inserted successfully:", result.rows);
      res.status(201).send(result.rows);
    }
  );
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
