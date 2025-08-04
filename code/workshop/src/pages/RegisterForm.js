import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyle.css";
import "./RegisterForm.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", college: "", department: "", year: "", reason: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mkautoreg.onrender.com/api/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Registration Successful!");
        setFormData({ name: "", email: "", phone: "", college: "", department: "", year: "", reason: "" });
      } else {
        const data = await response.json();
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="register-form">
        <h1>⚡ Electronics Workshop Registration</h1>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required />
          <input name="college" placeholder="College/Institution" value={formData.college} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Year of Study</option>
            <option>1st</option><option>2nd</option><option>3rd</option><option>4th</option>
          </select>
          <textarea name="reason" placeholder="Why are you interested in electronics?" value={formData.reason} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <div className="admin-hover-area">
          <button className="admin-float" onClick={() => navigate("/admin")}>Admin Login</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
