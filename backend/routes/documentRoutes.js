const express = require("express");
const multer = require("multer");
const path = require("path");   // <--- Added
const Batch = require("../models/batchModels");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/upload/:batchId", upload.single("document"), async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });

    if (!batch) return res.status(404).json({ message: "Batch not found" });

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const doc = {
      filename: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date()
    };

    if (!batch.documents) batch.documents = [];
    batch.documents.push(doc);
    await batch.save();

    res.status(200).json({ message: "Document uploaded", document: doc });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document", error });
  }
});

router.get("/:batchId", async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: "Batch not found" });

    res.json(batch.documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
});

router.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.download(filePath); // prompts download
});

module.exports = router;
