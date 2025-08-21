import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLanding from "./components/MainLanding";
import Login from "./components/Login";
import RegisterAdmin from "./components/RegisterAdmin";
import RegisterStudent from "./components/RegisterStudent";
import AdminDashboard from "./components/AdminDashboard";
import AddBatch from "./components/AddBatch";
import BatchDetails from "./components/BatchDetails";
import StudentProfile from "./components/StudentProfile";
import TestPage from "./components/TestPage";
import CreateTest from "./components/CreateTest";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLanding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-admin" element={<RegisterAdmin />} />
                <Route path="/register-student" element={<RegisterStudent />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/add-batch" element={<AddBatch />} />
                <Route path="/batch/:batchId" element={<BatchDetails />} />
                <Route path="/register-student/:batchId" element={<RegisterStudent />} />
                <Route path="/student/:studentId" element={<StudentProfile />} />
                <Route path="/create-test/:batchId" element={<CreateTest />} />
                <Route path="/test/:testId" element={<TestPage />} />
                 

            </Routes>
        </Router>
    );
}

export default App;
