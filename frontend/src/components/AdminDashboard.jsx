import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch("http://localhost:5000/batches/all");
      const data = await response.json();
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/batches/${id}`, { method: "DELETE" });
      fetchBatches();
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6faff",
      fontFamily: "'Inter', Arial, sans-serif",
      padding: "0 0 48px 0"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "48px auto 0 auto",
        padding: "0 16px"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "18px"
        }}>
          <h1 style={{
            fontSize: "2.3rem",
            fontWeight: 800,
            color: "#00226bff",
            marginBottom: "0",
            borderBottom: "3px solid #e3eafe",
            display: "inline-block",
            paddingBottom: "6px",
            letterSpacing: "1px"
          }}>
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <button
              onClick={() => navigate("/add-batch")}
            >
              Add New Batch
            </button>
            <button>
              Add Admin
            </button>
          </div>
        </div>
        <div style={{
          borderBottom: "2px solid #e3eafe",
          margin: "18px 0 28px 0"
        }} />
        <h2 style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#1746a0",
          marginBottom: "18px",
          borderBottom: "2px solid #e3eafe",
          display: "inline-block",
          paddingBottom: "4px",
          letterSpacing: "0.5px"
        }}>
          Existing Batches
        </h2>

        {batches.length > 0 ? (
          <div
            className="batch-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
              marginTop: "0"
            }}
          >
            {batches.map((batch) => (
              <div
                key={batch._id}
                style={{
                  minHeight: 120,
                  borderRadius: 14,
                  padding: "22px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1.5px solid #e3eafe",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(67,97,238,0.04)",
                  transition: "box-shadow 0.2s, background 0.2s"
                }}
              >
                <div>
                  <p style={{
                    fontWeight: 700,
                    fontSize: "1.12rem",
                    marginBottom: 6,
                    color: "#2563eb",
                    letterSpacing: "0.5px"
                  }}>{batch.batchName}</p>
                  <p style={{
                    fontWeight: 500,
                    color: "#555",
                    marginBottom: 2
                  }}>Batch ID: <span style={{ color: "#1746a0" }}>{batch.batchId}</span></p>
                  <p style={{
                    fontWeight: 500,
                    color: "#555"
                  }}>Fee: <span style={{ color: "#2563eb" }}>₹{batch.batchFee}</span></p>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button
                    onClick={() => navigate(`/batch/${batch.batchId}`)}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(batch._id)}
                    style={{
                      background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
                      color: "#fff"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: "32px",
            textAlign: "center",
            color: "#555"
          }}>
            <p>No batches found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;