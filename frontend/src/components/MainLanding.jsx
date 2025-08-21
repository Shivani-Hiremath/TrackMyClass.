import { useNavigate } from "react-router-dom";
import DashboardImg from "../assets/dashboard.svg";

export default function MainLanding() {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col min-h-[80vh] justify-center items-center relative">
      {/* Top bar */}
      <div className="w-full flex justify-end items-center absolute top-0 left-0 p-6">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      {/* Main content */}
      <div className="flex flex-col items-center justify-center mt-24">
        <img src={DashboardImg} alt="Dashboard" className="illustration" />
        <h1 className="text-4xl font-bold mb-4">Welcome to TrackMyClass</h1>
        <p className="text-lg mb-8 text-gray-700 max-w-xl text-center">
          Manage batches, students, and tests with ease. TrackMyClass helps you organize your classes, monitor student progress, and streamline your workflow.
        </p>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}