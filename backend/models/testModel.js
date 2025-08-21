const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  maxMarks: { type: Number, required: true },
  subject: { type: String, required: true },
  batchId: { type: String, required: true }, // Store batch reference
});

module.exports = mongoose.model("Test", studentSchema);
