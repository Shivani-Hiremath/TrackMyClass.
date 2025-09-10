import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeeUpdateCard from "./FeeUpdateCard";
import { io } from "socket.io-client";

const socket = io("https://trackmyclass-d6yn.onrender.com");

const BatchDetails = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [openSection, setOpenSection] = useState(null); // which dropdown is open

  useEffect(() => {
    fetchBatch();
    fetchStudents();
    fetchTests();
  }, []);

  useEffect(() => {
    if (batchId) {
      axios
        .get(`/api/documents/${batchId}`)
        .then((res) => setDocuments(Array.isArray(res.data) ? res.data : []))
        .catch(() => setDocuments([]));
    }
  }, [batchId]);

  const fetchBatch = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-d6yn.onrender.com/batches/${batchId}`);
      setBatch(response.data);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-d6yn.onrender.com/auth/students/${batchId}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-d6yn.onrender.com/tests/tests/${batchId}`);
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      await axios.post(
        `https://trackmyclass-d6yn.onrender.com/api/documents/upload/${batch.batchId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploadMsg("Document uploaded!");
      const res = await axios.get(`/api/documents/${batchId}`);
      setDocuments(Array.isArray(res.data) ? res.data : []);
      setSelectedFile(null);
    } catch (err) {
      setUploadMsg("Upload failed.");
      console.error("Error uploading document:", err);
    }
  };

  const handleStartClass = () => {
    const roomName = `batch_${batchId}_${Date.now()}`;
    socket.emit("startClass", { batchId, roomName });
    window.open(`https://meet.jit.si/${roomName}`, "_blank");
  };

  if (!batch) return <p>Loading...</p>;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "28px",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(58,12,163,0.08)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#2d1e6b" }}>
          {batch.batchName}{" "}
          <span style={{ fontWeight: 500, color: "#555", fontSize: "1.1rem" }}>
            ({batch.batchId})
          </span>
        </h2>
        <p style={{ fontWeight: 600, color: "#7209b7", marginBottom: 16 }}>
          Batch Fee: ₹{batch.batchFee}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link to={`/register-student/${batchId}`} className="btn-square">
            Register Student
          </Link>
          <Link to={`/create-test/${batchId}`} className="btn-square">
            Create Test
          </Link>
          <button onClick={handleStartClass} className="btn-square">
            Start a Class
          </button>
        </div>
      </div>

      {/* Dropdown Buttons */}
      <div>
        {/* Students */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleSection("students")}>
            Students {openSection === "students" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openSection === "students" && (
            <div className="dropdown-content">
              {students.length === 0 ? (
                <p>No students registered yet.</p>
              ) : (
                students.map((s) => (
                  <Link key={s._id} to={`/student/${s._id}`} className="btn-light">
                    {s.name}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Tests */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleSection("tests")}>
            Tests {openSection === "tests" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openSection === "tests" && (
            <div className="dropdown-content">
              {tests.length === 0 ? (
                <p>No tests created yet.</p>
              ) : (
                tests.map((t) => (
                  <Link key={t._id} to={`/test/${t._id}`} className="btn-light">
                    {t.testName}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Fees */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleSection("fees")}>
            Update Fees {openSection === "fees" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openSection === "fees" && (
            <div className="dropdown-content">
              <button onClick={() => setShowFeesModal(true)} className="btn-light">
                Open Fees Modal
              </button>
            </div>
          )}
        </div>

        {/* Documents */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleSection("docs")}>
            Documents {openSection === "docs" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openSection === "docs" && (
            <div className="dropdown-content">
              <form onSubmit={handleUpload} style={{ marginBottom: 10 }}>
                <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
                <button type="submit" className="btn-light" style={{ marginTop: 8 }}>
                  Upload
                </button>
              </form>
              {uploadMsg && <p>{uploadMsg}</p>}
              <h4>Uploaded Documents</h4>
              {documents.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light"
                >
                  {doc.filename}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fees Modal */}
      {showFeesModal && (
        <div className="modal">
          <h3>Update Fees</h3>
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name}{" "}
                <button onClick={() => setSelectedStudent(student)} className="btn-light">
                  Open
                </button>
              </li>
            ))}
          </ul>
          {selectedStudent && (
            <FeeUpdateCard
              student={selectedStudent}
              batchFee={batch.batchFee}
              onClose={() => setSelectedStudent(null)}
            />
          )}
          <button onClick={() => setShowFeesModal(false)} className="btn-light">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BatchDetails;
