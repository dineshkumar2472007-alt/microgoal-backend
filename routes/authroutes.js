const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});

// Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });

    } else {

      res.status(401).json({ message: "Invalid credentials" });

    }

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;
