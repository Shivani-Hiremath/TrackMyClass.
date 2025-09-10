import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileImg from "../assets/profile.svg"; // Make sure this exists
import { io } from "socket.io-client";

const socket = io("https://trackmyclass-d6yn.onrender.com");

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [profile, setProfile] = useState(ProfileImg);
  const [documents, setDocuments] = useState([]);
  const [fees, setFees] = useState([]);
  const [meetingRoom, setMeetingRoom] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    // Join batch room for notifications
    if (student && student.batchId) {
      socket.emit("joinBatch", { batchId: student.batchId, studentId });
    }

    // Listen for class start
    socket.on("startClass", ({ roomName }) => {
      alert("Class is starting! Click the button to join or rejoin anytime.");
      setMeetingRoom(roomName);
      setShowNotification(true);
    });

    return () => {
      socket.off("startClass");
    };
  }, [student, studentId]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-d6yn.onrender.com/auth/student/${studentId}`);
      setStudent(response.data);
      // If you have a profile image URL in your backend, set it here:
      // setProfile(response.data.profileImage || ProfileImg);

      // Fetch documents for the student's batch
      if (response.data && response.data.batchId) {
        const docResponse = await axios.get(`https://trackmyclass-d6yn.onrender.com/api/documents/${response.data.batchId}`);
        setDocuments(Array.isArray(docResponse.data) ? docResponse.data : []);
      }

      // Fetch fee history for the student
      const feeResponse = await axios.get(`/api/batches/student/${studentId}/fees`);
      setFees(Array.isArray(feeResponse.data) ? feeResponse.data : []);
    } catch (error) {
      console.error("Error fetching student profile:", error);
      setStudent(null);
    }
  };

  const handleJoinClass = () => {
    if (meetingRoom) {
      window.open(`https://meet.jit.si/${meetingRoom}`, "_blank");
      setShowNotification(false); // Hide notification after joining
    }
  };

  if (!student) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#3a0ca3", fontWeight: 700, fontSize: "1.3rem" }}>Loading...</span>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0"
      }}
    >
      <div
        style={{
          width: "100%",
    maxWidth: "800px",
    padding: "20px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff"
        }}
      >
        {/* Profile Image */}
        <div style={{ marginBottom: 18 }}>
          <img
            src={profile}
            alt="Student Profile"
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #7209b7",
              boxShadow: "0 2px 12px #bdb2ff33",
              background: "#fff"
            }}
          />
        </div>
        {/* Name */}
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#2d1e6b",
            letterSpacing: "-1px",
            marginBottom: 8,
            textAlign: "center",
            textShadow: "0 4px 24px #bdb2ff44, 0 1px 0 #fff",
            borderBottom: "2.5px solid #7209b7",
            paddingBottom: "6px",
            width: "fit-content"
          }}
        >
          {student.name}
        </h2>
        <p style={{ color: "#555", fontWeight: 500, fontSize: "1.1rem", marginBottom: 18 }}>
          {student.email}
        </p>
        <div style={{ width: "100%", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#3a0ca3", fontWeight: 700 }}>Date of Birth:</span>
            <span style={{ color: "#555", fontWeight: 600 }}>{student.dob}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#3a0ca3", fontWeight: 700 }}>Fees Due:</span>
            <span style={{ color: "#ef4444", fontWeight: 700 }}>₹{student.feesDue}</span>
          </div>
        </div>
        <div style={{
          width: "100%",
          marginTop: 16,
          background: "#f8f7ff",
          borderRadius: 12,
          padding: "18px 16px",
          boxShadow: "0 1px 4px rgba(67,97,238,0.06)"
        }}>
          <h3 style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#3a0ca3",
            margin: 0,
            marginBottom: 10
          }}>
            Marks
          </h3>
          {(!student.marks || student.marks.length === 0) ? (
            <p style={{ color: "#888", margin: 0 }}>No marks available.</p>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {student.marks.map((mark) => (
                <li
                  key={mark.testId._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: "1px solid #e3e6ee",
                    fontWeight: 600,
                    color: "#555"
                  }}
                >
                  <span>
                    <span style={{ color: "#7209b7", fontWeight: 700 }}>{mark.testId.testName}</span>
                  </span>
                  <span>
                    <span style={{ color: "#2563eb", fontWeight: 700 }}>{mark.score}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Batch Documents */}
        <div style={{ width: "100%", marginTop: 24 }}>
          <h3 style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#3a0ca3",
            margin: 0,
            marginBottom: 10
          }}>
            Batch Documents
          </h3>
          {documents.length === 0 ? (
            <p style={{ color: "#888", margin: 0 }}>No documents available for this batch.</p>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {documents.map((doc, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #e3e6ee",
                    fontWeight: 600,
                    color: "#555"
                  }}
                >
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                      fontWeight: 700
                    }}
                  >
                    {doc.filename}
                  </a>{" "}
                  (Uploaded: {new Date(doc.uploadedAt).toLocaleString()})
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Fee History */}
        <div style={{ width: "100%", marginTop: 24 }}>
          <h3 style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#3a0ca3",
            margin: 0,
            marginBottom: 10
          }}>
            Fee History
          </h3>
          {fees.length === 0 ? (
            <p style={{ color: "#888", margin: 0 }}>No fee payments yet.</p>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {fees.map((fee, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #e3e6ee",
                    fontWeight: 600,
                    color: "#555"
                  }}
                >
                  ₹{fee.amount} on {new Date(fee.date).toLocaleString()} {fee.remarks && `(${fee.remarks})`}
                </li>
              ))}
            </ul>
          )}
        </div>
        {showNotification && meetingRoom && (
          <div className="class-notification" style={{ marginTop: 20, padding: "10px 20px", background: "#e1f5fe", borderRadius: 8, width: "100%" }}>
            <p style={{ margin: 0, color: "#01579b" }}>Class is starting! Click below to join.</p>
            <button onClick={handleJoinClass} style={{ marginTop: 8, padding: "10px 20px", background: "#01579b", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Join Class
            </button>
          </div>
        )}
        {meetingRoom && (
          <button onClick={handleJoinClass} style={{ marginTop: 12, padding: "10px 20px", background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Rejoin Class
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;