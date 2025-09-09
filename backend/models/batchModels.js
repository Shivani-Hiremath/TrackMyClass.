const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadedAt: { type: Date, default: Date.now }
});

const batchSchema = new mongoose.Schema({
  batchName: { type: String, required: true },
  batchId: { type: String, required: true, unique: true },
  batchFee: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  documents: [documentSchema]
});

module.exports = mongoose.model("Batch", batchSchema);
