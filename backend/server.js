const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
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
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
const port=process.env.PORT|| 4000;
// Store connected students by batch
const batchStudents = {};
let activeMeetings = {}; // { batchId: roomName }

io.on("connection", (socket) => {
  // Student joins a batch room
  socket.on("joinBatch", ({ batchId, studentId }) => {
    socket.join(batchId);
    batchStudents[studentId] = batchId;

    // If a meeting is active for this batch, notify the student
    if (activeMeetings[batchId]) {
      socket.emit("startClass", { roomName: activeMeetings[batchId] });
    }
  });

  // Start class and notify all students in the batch
  socket.on("startClass", ({ batchId, roomName }) => {
    activeMeetings[batchId] = roomName; // Save active meeting
    io.to(batchId).emit("startClass", { roomName });
  });

  // Optionally, handle meeting end (not required for basic use)
  socket.on("endClass", ({ batchId }) => {
    delete activeMeetings[batchId];
    io.to(batchId).emit("endClass");
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    // Optionally remove student from batchStudents
  });
});

// Export io for use in routes if needed
module.exports.io = io;

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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));