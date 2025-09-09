const express = require("express");
const { getBatches, addBatch, getBatchById, deleteBatch } = require("../controller/batchController");
const Student = require("../models/studentModel");

const router = express.Router();

// Route to get all batches
router.get("/all", getBatches);

// Route to add a new batch
router.post("/add", addBatch);

// Route to get batch details by batch ID
router.get("/:batchId", getBatchById);

// Route to delete a batch
router.delete("/:id", deleteBatch);

// Get all students in a batch
router.get("/:batchId/students", async (req, res) => {
  const students = await Student.find({ batchId: req.params.batchId });
  res.json(students);
});

// Get fee history for a student
router.get("/student/:studentId/fees", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  res.json(student.fees || []);
});

// Add a fee payment for a student
router.post("/student/:studentId/fees", async (req, res) => {
  const { amount, remarks } = req.body;
  const student = await Student.findById(req.params.studentId);
  student.fees.push({ amount, remarks });
  await student.save();
  res.json({ message: "Fee updated", fees: student.fees });
});

module.exports = router;
