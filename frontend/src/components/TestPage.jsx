import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TestPage = () => {
  const { testId } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-d6yn.onrender.com/tests/test/${testId}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleMarkChange = (studentId, score) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: score,
    }));
  };

  const handleSubmit = async () => {
  const marksArray = students.map(student => ({
    studentId: student._id,
    score: marks[student._id] === "" || marks[student._id] == null
      ? 0
      : parseInt(marks[student._id], 10)
  }));

  try {
    await axios.post(`https://trackmyclass-d6yn.onrender.com/tests/test/${testId}/marks`, { marks: marksArray });
    alert("Marks submitted successfully!");
  } catch (error) {
    console.error("Error submitting marks:", error);
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "60px 0",
        overflow: "auto"
      }}
    >
      <h2
        style={{
          fontSize: "2.4rem",
          fontWeight: 900,
          color: "black",
          marginBottom: 36,
          textAlign: "center",
          letterSpacing: "-1px",
        }}
      >
        🎯 Scoreboard
      </h2>
      {students.length === 0 ? (
        <p style={{ textAlign: "center", color: "black" }}>No students found for this batch.</p>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{
            maxWidth: 700,
            margin: "0 auto"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", marginBottom: 40 }}>
            {students.map((student) => (
              <div
                key={student._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: 12,
                  padding: "18px 24px",
                  boxShadow: "0 1px 4px rgba(67,97,238,0.06)",
                  gap: "24px"
                }}
              >
                <span style={{
                  fontWeight: 800,
                  color: "black",
                  flex: 1,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.5px"
                }}>
                  {student.name}
                </span>
                <input
                  type="number"
                  placeholder="Marks"
                  min={0}
                  style={{
                    width: 100,
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #e3e6ee",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    outline: "none",
                    background: "#fff",
                  }}
                  value={marks[student._id] || ""}
                  onChange={(e) => handleMarkChange(student._id, e.target.value)}
                  
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                background: "linear-gradient(90deg, #4361ee 0%, #7209b7 100%)",
                color: "#fff",
                padding: "14px 48px",
                borderRadius: "30px",
                fontWeight: 800,
                fontSize: "1.2rem",
                border: "none",
                boxShadow: "0 2px 12px rgba(67,97,238,0.10)",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s"
              }}
              onMouseOver={e =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #7209b7 0%, #4361ee 100%)")
              }
              onMouseOut={e =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #4361ee 0%, #7209b7 100%)")
              }
            >
              Submit Marks
            </button>
          </div>
        </form>
      )}

    
    </div>
  );
};

export default TestPage;