import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "eni3d6pl",
  host: "localhost",
  port: 5432,
  database: "classroom",
});

export default pool;
