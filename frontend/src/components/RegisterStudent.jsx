import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterImg from "../assets/register.svg";

const RegisterStudent = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register-student", { ...formData, batchId });
      navigate(`/batch/${batchId}`);
    } catch (error) {
      console.error("Error registering student:", error);
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
            Register Student
          </h1>
          <p style={{ color: "#555", fontWeight: 500, fontSize: "1rem" }}>
            For Batch {batchId}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{ minWidth: 140 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              Register
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
          src={RegisterImg}
          alt="Register Illustration"
          className="illustration"
          style={{ width: 220, marginBottom: 0 }}
        />
      </div>
    </div>
  );
};

export default RegisterStudent;