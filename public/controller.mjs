import pool from "../db.mjs";

export const insertClasses = async (req, res) => {
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
};
export const getSimilarClasses = async (req, res) => {
  try {
    const { room_id, build } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM classes WHERE room_id != $1 AND building = $2",
      [room_id, build]
    );
    res.json({ data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertTimeSlots = async (req, res) => {
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
};

export const getTimeSlots = async (req, res) => {
  pool.query("SELECT * FROM time_slots", (error, result) => {
    if (error) {
      console.error("Error retrieving time slots:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

export const getFilteredClasses = async (req, res) => {
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
    } = req.params;

    const query = `
    SELECT DISTINCT ON (sc.room_id) sc.room_id,sc.week_id,sc.garag,sc.time,cl.roomno,cl.building,cl.type,cl.capacity,cl.projector,sc.status
      FROM schedule as sc
      INNER JOIN classes as cl ON sc.room_id = cl.room_id
	    WHERE cl.building = $1
      AND sc.time BETWEEN $2 AND $3
      AND sc.garag = $4
      AND sc.status = true;
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
};

export const getRating = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { rows } = await pool.query(
      `SELECT AVG("air_rate") as air, AVG("comfort_rate") as comfort, AVG("wifi_rate") as wifi, AVG("slot_rate") as slot FROM ratings WHERE room_id = $1 GROUP BY room_id`,
      [room_id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertRating = async (req, res) => {
  const { id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate } =
    req.body;
  const { userId } = req.user;
  pool.query(
    "INSERT INTO ratings(id, user_id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate ) VALUES($1,$2,$3,$4,$5,$6, $7)",
    [id, userId, room_id, air_rate, comfort_rate, wifi_rate, slot_rate],
    (err, result) => {
      if (!err) {
        res.status(201).send(result.rows);
      } else {
        res.status(500).send(err.message);
      }
    }
  );
};
export const insertReservations = async (req, res) => {
  const {
    res_id,
    user_id,
    room_id,
    date,
    purpose,
    description,
    people,
    phone1,
    phone2,
    cancelled,
    status,
  } = req.body;
  pool.query(
    "INSERT INTO reservations(res_id, user_id, room_id, date, purpose, description, people, phone1, phone2, cancelled, status) VALUES($1,$2,$3,$4,$5,$6, $7, $8, $9, $10, $11)",
    [
      res_id,
      user_id,
      room_id,
      date,
      purpose,
      description,
      people,
      phone1,
      phone2,
      cancelled,
      status,
    ],
    (err, result) => {
      if (!err) {
        res.status(201).send(result.rows);
      } else {
        res.status(500).send(err.message);
      }
    }
  );
};
export const insertLiked = async (req, res) => {
  const { room_id } = req.body;
  const { userId } = req.user;
  pool.query(
    "INSERT INTO liked(user_id, room_id) VALUES($1,$2)",
    [userId, room_id],
    (err, result) => {
      if (!err) {
        res.status(201).send(result.rows);
      } else {
        res.status(500).send(err.message);
      }
    }
  );
};
export const getLikedClasses = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rows } = await pool.query(
      "SELECT * FROM liked WHERE user_id = $1 AND delete_flag = FALSE",
      [userId]
    );
    res.json({ liked_rooms: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getLikedClass = async (req, res) => {
  try {
    const { userId } = req.user;
    const { room_id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM liked WHERE user_id = $1 AND room_id = $2 AND delete_flag = FALSE",
      [userId, room_id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTimes = async (req, res) => {
  try {
    const { room_id, week, garag } = req.params;
    const { rows } = await pool.query(
      "SELECT time, status FROM schedule WHERE room_id = $1 AND week_id = $2 AND garag = $3",
      [room_id, week, garag]
    );
    res.json({ data: rows });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneRoom = async (req, res) => {
  const { room_id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM classes WHERE room_id = $1",
      [room_id]
    );
    res.json({ room: rows });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecommendedClasses = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT classes.*, ( AVG(air_rate) + AVG(wifi_rate) + AVG(comfort_rate) + AVG(slot_rate)) / 4 as totalRating FROM ratings LEFT JOIN classes ON classes.room_id = ratings.room_id WHERE delete_flag = FALSE GROUP BY classes.room_id ORDER BY totalRating DESC LIMIT 10"
    );
    res.json({ recommend: rows });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteLikedClass = async (req, res) => {
  try {
    const { userId } = req.user;
    const { room_id } = req.body;

    const result = await pool.query(
      "UPDATE liked SET delete_flag = TRUE WHERE user_id = $1 AND room_id = $2 AND delete_flag = FALSE",
      [userId, room_id]
    );

    if (result.rowCount == 0) {
      res.status(404).json({ message: "No record found or already deleted" });
    } else {
      res.status(200).json({ message: "Record deleted" });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};
