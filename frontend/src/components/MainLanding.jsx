import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaFileAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaVideo,
  FaClipboardList,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function MainLanding() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#2563eb",
        }}
      >
        {/* Logo */}

        <img src={logo} alt="Logo"style={{ marginLeft: "20px",height: "50px" }} />
        {/* Login Button */}
        <button
          style={{
            background: "#ffffff",
            color: "#2563eb",
            padding: "10px 28px",
            borderRadius: "30px",
            fontWeight: 700,
            fontSize: "1.1rem",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            marginRight: "20px", // less margin
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      {/* Main Title */}
      <h1
        style={{
          fontSize: "2.8rem",
          fontWeight: 800,
          color: "#000",
          margin: "32px 0 12px 0",
          textAlign: "center",
        }}
      >
        TrackMyClass
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#3b4a6b",
          fontWeight: 500,
          marginBottom: "36px",
          textAlign: "center",
        }}
      >
        Your all-in-one platform for classes, tests, reports, documents, and fees.
      </p>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "32px",
          width: "90%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <FeatureCard
          icon={<FaChalkboardTeacher size={36} color="#2563eb" />}
          title="Join Classes"
          desc="One-click access to your scheduled classes."
        />
        <FeatureCard
          icon={<FaClipboardList size={36} color="#2563eb" />}
          title="Attend Tests"
          desc="Participate in online tests and view results."
        />
        <FeatureCard
          icon={<FaChartLine size={36} color="#2563eb" />}
          title="Reports"
          desc="Track your progress with detailed analytics."
        />
        <FeatureCard
          icon={<FaFileAlt size={36} color="#2563eb" />}
          title="Access Documents"
          desc="Download study materials and certificates."
        />
        <FeatureCard
          icon={<FaVideo size={36} color="#2563eb" />}
          title="Live Classes"
          desc="Join interactive video sessions instantly."
        />
        <FeatureCard
          icon={<FaMoneyBillWave size={36} color="#2563eb" />}
          title="Fee Update"
          desc="View and update your fee payments securely."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      style={{
        background: "#e6f4ff", // light sky blue
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        padding: "32px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "220px",
      }}
    >
      <div style={{ marginBottom: "18px" }}>{icon}</div>
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#2563eb",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#3b4a6b",
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        {desc}
      </p>
    </div>
  );
}
