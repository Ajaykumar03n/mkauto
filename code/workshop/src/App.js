
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import AdminLogin from './pages/AdminLogin';
import StudentsList from './pages/StudentsList';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/students" element={<StudentsList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
