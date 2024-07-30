// users_controller.mjs

import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup controller
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Authentication failed");
    }

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(401).send("Authentication failed");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
