const express = require("express");
const Student = require("../models/studentModel");
const Batch = require("../models/batchModels");
const router = express.Router();

// Get all students in a batch
router.get("/:batchId/students", async (req, res) => {
  try {
    const students = await Student.find({ batchId: req.params.batchId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Get fee history for a student
router.get("/student/:studentId/fees", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student.fees || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fee history", error });
  }
});

// Add a new fee payment for a student
router.post("/student/:studentId/fees", async (req, res) => {
  const { amount, remarks } = req.body;
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.fees.push({ amount, remarks });
    await student.save();
    res.json({ message: "Fee updated", fees: student.fees });
  } catch (error) {
    res.status(500).json({ message: "Error updating fee", error });
  }
});

module.exports = router;