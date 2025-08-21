import React, { useState } from "react";
import { registerAdmin } from "../api";
import LoginImg from "../assets/login.svg";

const RegisterAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(name, email, password);
      setMessage("Admin Registered Successfully");
    } catch (err) {
      setMessage("Error registering admin");
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
        <div className="flex flex-col items-center mb-4">
          <h1
            className="text-3xl font-bold text-center mb-2"
            style={{ color: "#3a0ca3" }}
          >
            Register Admin
          </h1>
          <p style={{ color: "#555", fontWeight: 500, fontSize: "1rem" }}>
            Create a new admin account
          </p>
        </div>
        {message && (
          <div
            style={{
              color: message.includes("Success") ? "#059669" : "#ef4444",
              fontWeight: 600,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{ minWidth: 140 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              Register Admin
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
          src={LoginImg}
          alt="Admin Register Illustration"
          className="illustration"
          style={{ width: 220, marginBottom: 0 }}
        />
      </div>
    </div>
  );
};

export default RegisterAdmin;