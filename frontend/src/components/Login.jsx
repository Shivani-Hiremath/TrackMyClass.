import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginImg from '../assets/login.svg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        gap: "0",
        background: "#fff",
        boxShadow: "0 8px 32px rgba(58,12,163,0.04)",
      }}
    >
      {/* Left: Login Form */}
      <motion.div
        className="card"
        style={{
          flex: 1,
          maxWidth: 400,
          marginRight: 0,
          marginLeft: 0,
          minWidth: 320,
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "#3a0ca3" }}>
            Login to TrackMyClass
          </h1>
        </div>
        {error && (
          <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ color: "red", textAlign: "center" }}>
            {error}
          </motion.p>
        )}
        <form onSubmit={handleLogin}>
  <div className="input-wrapper">
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

  <motion.button
    type="submit"
    className="w-full mt-2"
    style={{ minWidth: 120, display: "flex", justifyContent: "center"  }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
  >
    Login
  </motion.button>
  </div>
</form>

      </motion.div>
      {/* Right: Illustration */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 260,
        }}
      >
        <img
          src={LoginImg}
          alt="Login Illustration"
          style={{
            width: "70%",
            maxWidth: 320,
            minWidth: 180,
            margin: "0 auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default Login;