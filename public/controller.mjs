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
};
