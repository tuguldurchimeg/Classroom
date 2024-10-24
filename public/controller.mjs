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
    "INSERT INTO default_time_slots(room_id, garag, time) VALUES($1, $2, $3)",
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
  pool.query("SELECT * FROM default_time_slots", (error, result) => {
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
    SELECT DISTINCT ON (sc.room_id) sc.room_id,sc.garag,sc.time,cl.roomno,cl.building,cl.type,cl.capacity,cl.projector,sc.status
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
    const query = `
      SELECT AVG("air_rate") as air, AVG("comfort_rate") as comfort, AVG("wifi_rate") as wifi, AVG("slot_rate") as slot 
      FROM ratings 
      WHERE room_id = $1 
      GROUP BY room_id
    `;

    const { rows } = await pool.query(query, [room_id]);

    const defaultRatings = { air: 0, comfort: 0, wifi: 0, slot: 0 };
    const ratings = rows.length > 0 ? rows[0] : defaultRatings;

    const avgRate = (
      (parseFloat(ratings.air) +
        parseFloat(ratings.comfort) +
        parseFloat(ratings.wifi) +
        parseFloat(ratings.slot)) /
      4
    ).toFixed(1);

    res.json({ avgRate, rows: [ratings] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertRating = async (req, res) => {
  const { room_id, air_rate, comfort_rate, wifi_rate, slot_rate } = req.body;
  const { userId } = req.user;
  pool.query(
    "INSERT INTO ratings(user_id, room_id, air_rate, comfort_rate, wifi_rate, slot_rate ) VALUES($1,$2,$3,$4,$5,$6)",
    [userId, room_id, air_rate, comfort_rate, wifi_rate, slot_rate],
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
  const { room_id, date, times, details } = req.body;
  const { userId } = req.user;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertReservationQuery = `
      INSERT INTO reservations(user_id, room_id, purpose, description, people, phone1, phone2)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING res_id
    `;
    const insertReservationValues = [
      userId,
      room_id,
      details.purpose,
      details.description,
      details.people,
      details.phone1,
      details.phone2,
    ];

    const result = await client.query(
      insertReservationQuery,
      insertReservationValues
    );
    const res_id = result.rows[0].res_id;

    // Prepare and execute reservation_times inserts
    const resTimesQueries = times.map((timeElement) => {
      return client.query(
        "INSERT INTO reservation_times (res_id, date, time) VALUES ($1, $2, $3)",
        [res_id, date, timeElement]
      );
    });

    await Promise.all(resTimesQueries);
    await client.query("COMMIT");

    res.json({ res_id });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting reservation:", err.message); // Log error
    res.status(500).send({ error: err.message }); // Send structured error response
  } finally {
    client.release();
  }
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
      "SELECT classes.* FROM liked LEFT JOIN classes ON classes.room_id = liked.room_id WHERE user_id = $1 AND delete_flag = FALSE",
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

export const getReservations = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rows: reservations } = await pool.query(
      "SELECT reservations.*, classes.building, classes.roomno, classes.type FROM reservations LEFT JOIN classes ON classes.room_id = reservations.room_id WHERE user_id = $1 AND delete_flag = FALSE",
      [userId]
    );

    // Iterate over each reservation to get the reservation times
    for (let reservation of reservations) {
      const { rows: times } = await pool.query(
        "SELECT date, time FROM reservation_times WHERE res_id = $1",
        [reservation.res_id]
      );
      reservation.times = times; // Add the times to each reservation
    }

    res.json({ reservations });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { userId } = req.user;
    const { res_id } = req.params;
    const result = pool.query(
      "UPDATE reservations SET delete_flag = TRUE WHERE user_id = $1 AND res_id = $2",
      [userId, res_id]
    );
    if (result.rowCount == 0) {
      res.status(404).json({ message: "No record found or already deleted" });
    } else {
      res.status(200).json({ message: "Record deleted" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTimes = async (req, res) => {
  try {
    const { room_id, date } = req.params;
    const { rows } = await pool.query(
      "SELECT time, status FROM schedule WHERE room_id = $1 AND date = $2",
      [room_id, date]
    );
    res.json({ times: rows });
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
