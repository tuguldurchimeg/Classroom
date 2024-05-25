import express from "express";
import bodyParser from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import pool from "./db.mjs";
import jwt from "jsonwebtoken";
const app = express();

const hostname = "localhost";
const port = 3000;
//middleware
app.use(cors());
app.use(express.json()); // req.body
app.use(bodyParser.json());

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

app.get("/time_slots", (req, res) => {
  pool.query("SELECT * FROM time_slots", (error, result) => {
    if (error) {
      console.error("Error retrieving time slots:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.get("/filtered_classes", async (req, res) => {
  try {
    const {
      bairfinal,
      // startMonth,
      // startDay,
      // endMonth,
      // endDay,
      startTsag,
      endTsag,
      garag,
    } = req.query;

    const query = `
    SELECT sc.room_id,sc.week_id,sc.garag,sc.time,cl.roomno,cl.building,cl.type,cl.capacity,cl.projector,sc.status
      FROM schedule as sc
      INNER JOIN classes as cl ON sc.room_id = cl.room_id
	    WHERE cl.building = $1
      AND sc.time BETWEEN $2 AND $3
      AND sc.garag = $4;
  `;

    const { rows } = await pool.query(query, [
      bairfinal,
      // startMonth,
      // startDay,
      // endMonth,
      // endDay,
      startTsag,
      endTsag,
      garag,
    ]);
    res.json({ data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const authenticateUser = async (email, password) => {
  return pool.query(
    "SELECT user_id, username, password FROM users WHERE email=$1 and password=$2",
    [email, password],
    (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).send("User not found");
        }
      } else {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );
};

// login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const secretKey = "secret-key-black";
  // Fetch user data from the API

  const response = await authenticateUser(email, password);
  const user = response.data;
  // Check if the entered username and password match any user in the database
  if (!user)
    return res
      .status(400)
      .json({ message: "Email or password does not match" });

  const jwtToken = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
    },
    secretKey,
    { expiresIn: "1h" }
  );
  res.json({ user: user, token: jwtToken });
});

const users = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// Get the maximum user_id from the database
const getMaxUserId = async () => {
  try {
    const result = await pool.query("SELECT MAX(user_id) FROM users");
    return result.rows[0].max || 0;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// register user
app.post("/reg", async (req, res) => {
  const { user_id, password, phone, email } = req.body;
  try {
    const responseUsers = await users(email);
    if (responseUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const maxUserId = await getMaxUserId();
    const newUser_id = maxUserId + 1;

    const insertResult = await pool.query(
      "INSERT INTO users(user_id, password, phone, email) VALUES ($1, $2, $3, $4)",
      [newUser_id, password, phone, email]
    );
    res.status(201).send(insertResult.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
