
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


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
      const response = await axios.post("http://https://mkautoreg.onrender.com/api/auth/login", {
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
    <div className="container">
      <div className="form-box">
        <h1>🔒 Admin Login</h1>
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
