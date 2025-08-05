import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";


function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post("https://mkautoreg.onrender.com/api/auth/login", {
        password: password,
      });
      setSuccessMessage(response.data.message);
      login(response.data.token); // Store token in context
      navigate('/students');
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Login failed");
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>🔒 Admin Login</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
