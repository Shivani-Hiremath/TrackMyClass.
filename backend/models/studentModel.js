const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
  remarks: String,
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  batchId: { type: String, required: true },
  feesDue: { type: Number, default: 5000 },
  marks: [
    {
      testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
     //testName: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
      score: { type: Number, default: 0 },
    },
  ],
  fees: [feeSchema],
});

module.exports = mongoose.model("Student", studentSchema);