import pool from "../db.mjs";
import cron from "node-cron";

async function insertScheduleData() {
  const client = await pool.connect(); // Get a client from the pool
  try {
    // Calculate the start of the next week
    const now = new Date();
    const startOfNextWeek = new Date(now);
    startOfNextWeek.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7) + 7); // Next Monday

    // Days of the week in Mongolian
    const daysOfWeek = [
      "Даваа", // Monday
      "Мягмар", // Tuesday
      "Лхагва", // Wednesday
      "Пүрэв", // Thursday
      "Баасан", // Friday
      "Бямба", // Saturday
      "Ням", // Sunday
    ];

    // Generate queries for each day of the week
    const queries = daysOfWeek.map((day, index) => {
      const date = new Date(startOfNextWeek);
      date.setDate(date.getDate() + index);

      // Use parameterized queries to prevent SQL injection
      return {
        text: `INSERT INTO schedule (room_id, date, garag, time)
               SELECT room_id, $1, garag, time
               FROM default_time_slots WHERE garag = $2;`,
        values: [date, day],
      };
    });

    // Execute all queries
    for (const { text, values } of queries) {
      await client.query(text, values);
    }

    console.log("Schedule data inserted successfully.");
  } catch (err) {
    console.error("Error inserting schedule data:", err);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

// Schedule the task to run every Monday at midnight Ulaanbaatar time
cron.schedule("0 0 * * 1", insertScheduleData, {
  scheduled: true,
  timezone: "Asia/Ulaanbaatar",
});
