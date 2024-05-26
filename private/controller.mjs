import pool from "../db.mjs";

const authenticateUser = async (email, password) => {
  return pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
    email,
    password,
  ]);
};

export const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password);

    if (result && result.rows && result.rows.length > 0) {
      req.session.loggedin = true;
      req.session.email = result.rows[0].email;
      res.redirect("/");
    } else {
      const errorMessage = "Incorrect Username or Password";
      console.log(errorMessage);
      res.status(401).send(errorMessage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const users = async (email) => {
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

const getMaxUserId = async () => {
  try {
    const result = await pool.query("SELECT MAX(user_id) FROM users");
    return result.rows[0].max || 0;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const register = async (req, res) => {
  const { user_id, password, phone, email } = req.body;
  try {
    const responseUsers = await users(email);
    if (responseUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const maxUserId = await getMaxUserId();
    const newUser_id = maxUserId + 1;

    await pool.query(
      "INSERT INTO users(user_id, password, phone, email) VALUES ($1, $2, $3, $4)",
      [newUser_id, password, phone, email]
    );
    res.redirect("/"); // Redirect after registration
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

export const logout = (req, res) => {
  if (req.session.loggedin) {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  } else {
    const errorMessage = "Error";
    res.status(401).send(errorMessage);
  }
};
