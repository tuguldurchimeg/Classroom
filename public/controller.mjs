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
export const getClasses = async (req, res) => {
  pool.query("SELECT * FROM classes", (error, result) => {
    if (error) {
      console.error("Error retrieving classes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(result.rows);
    }
  });
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
};

export const getRating = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { rows } = await pool.query(
      "SELECT AVG(air-rate), AVG(comfort-rate), AVG(wifi-rate), AVG(slot-rate) FROM ratings GROUPBY $1",
      [room_id]
    );
    res.json({ data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const insertRating = async (req, res) => {
  const { id, user_id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate } =
    req.body;
  pool.query(
    "INSERT INTO ratings(id, user_id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate ) VALUES($1,$2,$3,$4,$5,$6, $7)",
    [id, user_id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate],
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
