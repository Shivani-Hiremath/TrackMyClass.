const Batch = require("../models/batchModels");

// Add a new batch
exports.addBatch = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { batchName, batchId, batchFee } = req.body;

    if (!batchName || !batchId || !batchFee) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBatch = await Batch.findOne({ batchId });
    if (existingBatch) {
      return res.status(400).json({ message: "Batch ID already exists" });
    }

    const newBatch = new Batch({ batchName, batchId, batchFee });
    console.log("Batch successfully created:", newBatch);

    await newBatch.save();
    res.status(201).json({ message: "Batch created successfully", batch: newBatch });
  } catch (error) {
    console.error("Error adding batch:", error);
    res.status(500).json({ message: "Error creating batch", error });
  }
};

// Get all batches
exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error });
  }
};

// Get batch details by batch ID
exports.getBatchById = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batch details", error });
  }
};

// Delete a batch
exports.deleteBatch = async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting batch", error });
  }
};
// Get batch details by batchId
exports.getBatchById = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(batch);
  } catch (error) {
    console.error("Error fetching batch details:", error);
    res.status(500).json({ message: "Error fetching batch details", error });
  }
};
