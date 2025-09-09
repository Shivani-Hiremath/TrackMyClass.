const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const batchRoutes = require("./routes/batchRoutes");
const testRoutes = require("./routes/testRoutes");
const documentRoutes = require('./routes/documentRoutes');
const feeRoutes = require('./routes/feeRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/batches", batchRoutes);
app.use("/tests", testRoutes);
app.use("/api/documents", documentRoutes); 
app.use("/api/batches", feeRoutes);
app.use('/uploads', express.static('backend/uploads'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));