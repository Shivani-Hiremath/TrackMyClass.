import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EducationImg from "../assets/education.svg";

const AddBatch = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchFee, setBatchFee] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/batches/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchName, batchId, batchFee }),
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        boxShadow: "0 8px 32px rgba(58,12,163,0.04)",
      }}
    >
      {/* Left: Form */}
      <div
        className="card"
        style={{
          flex: 1,
          maxWidth: 400,
          minWidth: 320,
          marginRight: 32,
        }}
      >
        <div className="flex flex-col items-center mb-4" style={{ display: "flex", justifyContent: "center" }}>
          <h1
            className="text-3xl font-bold text-center mb-2"
            style={{ color: "#3a0ca3" }}
          >
            Add Batch
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              placeholder="Batch Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
            <input
              placeholder="Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              required
            />
            <input
              placeholder="Batch Fee"
              value={batchFee}
              onChange={(e) => setBatchFee(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{ minWidth: 140 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              Create Batch
            </button>
          </div>
        </form>
      </div>
      {/* Right: Illustration */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 220,
        }}
      >
        <img
          src={EducationImg}
          alt="Education Illustration"
          className="illustration"
          style={{ width: 220, marginBottom: 0 }}
        />
      </div>
    </div>
  );
};

export default AddBatch;