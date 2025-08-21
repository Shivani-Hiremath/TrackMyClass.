const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const auth = require("../middleware/authMiddleware");
const router = express.Router();


// Register Admin (Like Normal Registration)
router.post("/register-admin", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });

    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// Register Student
router.post("/register-student", async (req, res) => {
  try {
    const { name, email, dob, batchId } = req.body;
    const defaultPassword = dob; // Set DOB as default password

    // Check if student email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }

    // Hash DOB before saving as password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create new student
    const newStudent = new Student({
      name,
      email,
      dob,
      password: hashedPassword,
      batchId,  // Store batch reference
      feesDue: 5000, // Default fee (modify as needed)
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
});


// Fetch students by batchId
router.get("/students/:batchId", async (req, res) => {
  try {
    const students = await Student.find({ batchId: req.params.batchId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Fetch student profile
router.get("/student/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "marks.testId", // Populate test details
      "testName" // Only fetch the testName field
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Error fetching student profile", error });
  }
});
// Login Route
// Login Route for Admin & Student
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // First, check if the user exists in the Admin database
        let user = await Admin.findOne({ email });

        if (!user) {
            // If not found in Admin, check the Student database
            user = await Student.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Return the role and success message
        res.json({ message: "Login successful", role: user.role, user });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
