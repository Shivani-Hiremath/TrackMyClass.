const express = require("express");
const { getBatches, addBatch, getBatchById, deleteBatch } = require("../controller/batchController");

const router = express.Router();

// Route to get all batches
router.get("/all", getBatches);

// Route to add a new batch
router.post("/add", addBatch);

// Route to get batch details by batch ID
router.get("/:batchId", getBatchById);

// Route to delete a batch
router.delete("/:id", deleteBatch);

router.get("/:batchId", getBatchById);

module.exports = router;
