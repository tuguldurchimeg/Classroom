import express from "express";
import db from "./model/user.mjs";

// Assigning db.users to User variable
const User = db.users;

// Function to check if username or email already exists in the database
// This is to avoid having two users with the same username and email
const userAuth = async (req, res, next) => {
  try {
    // Search the database to see if the user exists
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    // If username exists in the database, respond with a status of 409
    if (username) {
      return res.status(409).send("username already taken");
    }

    // Checking if email already exists
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email exists in the database, respond with a status of 409
    if (emailCheck) {
      return res.status(409).send("email already taken");
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Exporting module
export default userAuth;
