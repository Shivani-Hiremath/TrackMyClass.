import axios from "axios";

const API_URL = "http://localhost:5000/auth"; // Backend URL

export const login = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};

export const registerAdmin = async (name, email, password) => {
    return await axios.post(`${API_URL}/register-admin`, { name, email, password });
};

export const registerStudent = async (name, email, dob) => {
    return await axios.post(`${API_URL}/register-student`, { name, email, dob });
};
