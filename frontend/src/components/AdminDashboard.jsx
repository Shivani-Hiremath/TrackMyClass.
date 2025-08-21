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
    <div>
      {/* Modern Header */}
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          padding: "40px 40px 16px 40px",
          background: "transparent",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "18px",
          }}
        >
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 900,
              color: "#2d1e6b",
              letterSpacing: "-2px",
              margin: 0,
              textShadow: "0 4px 24px #bdb2ff44, 0 1px 0 #fff",
              borderBottom: "3px solid #7209b7",
              paddingBottom: "8px",
              marginBottom: "8px",
              width: "fit-content"
            }}
          >
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: "18px" }}>
            <button
              onClick={() => navigate("/add-batch")}
              style={{
                background: "linear-gradient(90deg, #4361ee 0%, #7209b7 100%)",
                color: "#fff",
                padding: "12px 32px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "none",
                boxShadow: "0 2px 12px rgba(67,97,238,0.10)",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                marginTop: "0",
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
              Add New Batch
            </button>
            <button
              onClick={() => navigate("/register-admin")}
              style={{
                background: "linear-gradient(90deg, #4361ee 0%, #7209b7 100%)",
                color: "#fff",
                padding: "12px 32px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "none",
                boxShadow: "0 2px 12px rgba(67,97,238,0.10)",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                marginTop: "0",
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
              Add Admin
            </button>
          </div>
        </div>
        {/* Divider line */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, #e0e7ff 0%, #bdb2ff 100%)",
            margin: "28px 0 18px 0",
            borderRadius: "2px",
          }}
        />
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#3a0ca3",
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          Existing Batches
        </h2>
      </div>

      {/* ...rest of your batch grid code remains unchanged... */}
      {batches.length > 0 ? (
        <div
          className="batch-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            padding: "0 40px 40px 40px",
            width: "100vw",
            boxSizing: "border-box",
          }}
        >
          {batches.map((batch) => (
            <div
              key={batch._id}
              style={{
                minHeight: 140,
                borderRadius: 10,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1.5px solid #e3e6ee",
                background: "rgba(255,255,255,0.85)",
                transition: "box-shadow 0.2s, background 0.2s",
                boxShadow: "0 2px 8px rgba(67,97,238,0.04)",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#f6f8fc"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 6 }}>{batch.batchName}</p>
                <p style={{ fontWeight: 500, color: "#555", marginBottom: 2 }}>Batch ID: {batch.batchId}</p>
                <p style={{ fontWeight: 500, color: "#555" }}>Fee: ₹{batch.batchFee}</p>
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "18px" }}>
                <button
                  onClick={() => navigate(`/batch/${batch.batchId}`)}
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseOut={e => e.currentTarget.style.background = "#2563eb"}
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(batch._id)}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    padding: "8px 20px",
                    borderRadius: 6,
                    border: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#dc2626"}
                  onMouseOut={e => e.currentTarget.style.background = "#ef4444"}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p>No batches found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;