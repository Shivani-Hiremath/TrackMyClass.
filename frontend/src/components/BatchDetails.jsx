import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeeUpdateCard from "./FeeUpdateCard";
const BatchDetails = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [documents, setDocuments] = useState([]);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchBatch();
    fetchStudents();
    fetchTests();
  }, []);
  
  // Fetch documents when component mounts or batchId changes
  useEffect(() => {
    if (batchId) {
      axios.get(`/api/documents/${batchId}`)
        .then(res => setDocuments(Array.isArray(res.data) ? res.data : []))
        .catch(() => setDocuments([]));
    }
  }, [batchId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      await axios.post(`http://localhost:5000/api/documents/upload/${batch.batchId}`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});

      setUploadMsg("Document uploaded!");
      // Refresh document list
      const res = await axios.get(`/api/documents/${batchId}`);
      setDocuments(Array.isArray(res.data) ? res.data : []);
      setSelectedFile(null);
    } catch (err) {
      setUploadMsg("Upload failed.");
      console.error("Error uploading document:", err); // Add this line
    }
  };
  const fetchBatch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/batches/${batchId}`);
      setBatch(response.data);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/students/${batchId}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tests/tests/${batchId}`);
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  if (!batch) return <p>Loading...</p>;

  return (
    <div
      className="container"
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: "32px",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(58,12,163,0.08)",
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#2d1e6b",
            marginBottom: 8,
          }}
        >
          {batch.batchName} <span style={{ fontWeight: 500, color: "#555", fontSize: "1.1rem" }}>({batch.batchId})</span>
        </h2>
        <p style={{ fontWeight: 600, color: "#7209b7", marginBottom: 24 }}>
          Batch Fee: ₹{batch.batchFee}
        </p>
<div style={{ display: "flex", gap: "18px", marginBottom: 0 }}>
  <Link
    to={`/register-student/${batchId}`}
    style={{
      background: "#2563eb",
      color: "#fff",
      padding: "10px 28px",
      borderRadius: "30px",
      fontWeight: 700,
      fontSize: "1rem",
      border: "none",
      boxShadow: "0 2px 12px rgba(67,97,238,0.10)",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background 0.2s, transform 0.2s",
      display: "inline-block"
    }}
    onMouseOver={e =>
      (e.currentTarget.style.background = "#1d4ed8")
    }
    onMouseOut={e =>
      (e.currentTarget.style.background = "#2563eb")
    }
  >
    Register Student
  </Link>
  <Link
    to={`/create-test/${batchId}`}
    style={{
      background: "#2563eb",
      color: "#fff",
      padding: "10px 28px",
      borderRadius: "30px",
      fontWeight: 700,
      fontSize: "1rem",
      border: "none",
      boxShadow: "0 2px 12px rgba(67,97,238,0.10)",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background 0.2s, transform 0.2s",
      display: "inline-block"
    }}
    onMouseOver={e =>
      (e.currentTarget.style.background = "#1d4ed8")
    }
    onMouseOut={e =>
      (e.currentTarget.style.background = "#2563eb")
    }
  >
    Create Test
  </Link>
</div>
      </div>

      {/* Students Section */}
      <div
        style={{
          background: "#f8f7ff",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 28,
          boxShadow: "0 2px 8px rgba(67,97,238,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: showStudents && students.length > 0 ? 18 : 0,
            userSelect: "none"
          }}
          onClick={() => setShowStudents((prev) => !prev)}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#3a0ca3", margin: 0 }}>
            Students in this batch
          </h3>
          {showStudents ? (
            <FaChevronUp style={{ marginLeft: 10, color: "#3a0ca3" }} />
          ) : (
            <FaChevronDown style={{ marginLeft: 10, color: "#3a0ca3" }} />
          )}
        </div>
        {showStudents && (
          students.length === 0 ? (
            <p style={{ margin: "12px 0 0 0", color: "#888" }}>No students registered yet.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginTop: 12 }}>
              {students.map((student) => (
                <Link
                  key={student._id}
                  to={`/student/${student._id}`}
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    padding: "10px 22px",
                    fontWeight: 600,
                    color: "#4361ee",
                    textDecoration: "none",
                    boxShadow: "0 1px 4px rgba(67,97,238,0.06)",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#e0e7ff";
                    e.currentTarget.style.color = "#3a0ca3";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#4361ee";
                  }}
                >
                  {student.name}
                </Link>
              ))}
            </div>
          )
        )}
      </div>
      
      <h3>Upload Document</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {uploadMsg && <p>{uploadMsg}</p>}

      <h4>Documents</h4>
      <ul>
        {(Array.isArray(documents) ? documents : []).map((doc, idx) => (
          <li key={idx}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.filename}
            </a> (Uploaded: {new Date(doc.uploadedAt).toLocaleString()})
          </li>
        ))}
      </ul>
      
      {/* Tests Section */}
      <div
        style={{
          background: "#f8f7ff",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 10,
          boxShadow: "0 2px 8px rgba(67,97,238,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: showTests && tests.length > 0 ? 18 : 0,
            userSelect: "none"
          }}
          onClick={() => setShowTests((prev) => !prev)}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#3a0ca3", margin: 0 }}>
            Tests in this batch
          </h3>
          {showTests ? (
            <FaChevronUp style={{ marginLeft: 10, color: "#3a0ca3" }} />
          ) : (
            <FaChevronDown style={{ marginLeft: 10, color: "#3a0ca3" }} />
          )}
        </div>
        {showTests && (
          tests.length === 0 ? (
            <p style={{ margin: "12px 0 0 0", color: "#888" }}>No tests created yet.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginTop: 12 }}>
              {tests.map((test) => (
                <Link
                  key={test._id}
                  to={`/test/${test._id}`}
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    padding: "10px 22px",
                    fontWeight: 600,
                    color: "#7209b7",
                    textDecoration: "none",
                    boxShadow: "0 1px 4px rgba(67,97,238,0.06)",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#e0e7ff";
                    e.currentTarget.style.color = "#3a0ca3";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#7209b7";
                  }}
                >
                  {test.testName}
                </Link>
              ))}
            </div>
          )
        )}
      </div>
      
      <button onClick={() => setShowFeesModal(true)}>Update Fees</button>
      {showFeesModal && (
        <div className="modal">
          <h3>Update Fees</h3>
          <ul>
            {students.map(student => (
              <li key={student._id}>
                {student.name}
                <button onClick={() => setSelectedStudent(student)}>Open</button>
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
          <button onClick={() => setShowFeesModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BatchDetails;