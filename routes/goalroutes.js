const express = require("express");
const router = express.Router();
const Goal = require("../models/goalmodel");
const authMiddleware = require("../middleware/authMiddleware");

// Create Goal
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const goal = await Goal.create({
      title: req.body.title,
      user: req.user,
    });

    res.status(201).json(goal);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// Get all goals
router.get("/", authMiddleware, async (req, res) => {

  try {

    const goals = await Goal.find({ user: req.user });

    res.json(goals);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// Update goal
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(goal);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// Delete goal
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Goal.findByIdAndDelete(req.params.id);

    res.json({ message: "Goal deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;