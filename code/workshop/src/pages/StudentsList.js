import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./StudentsList.css";
import { utils, writeFile } from "xlsx";


function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      if (!token) {
        setError("Not authenticated. Please login as admin.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("https://mkautoreg.onrender.com/api/sturecord", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data.students || []);
      } catch (err) {
        setError("Could not load students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [token]);

  const handleDownload = () => {
    if (students.length === 0) return;
    const worksheet = utils.json_to_sheet(students);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Students");
    writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="container">
      <div className="form-boxstudents-table">
        <h1>📋 Registered Students</h1>
        {students.length > 0 && (
          <button style={{ marginBottom: 16 }} onClick={handleDownload}>
            Download as Excel
          </button>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Department</th><th>Year</th><th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.college}</td><td>{s.department}</td><td>{s.year}</td><td>{s.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentsList;
