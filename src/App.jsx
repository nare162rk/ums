import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminApprovalPage from './pages/AdminApprovalPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Shows Landing Page on http://localhost:5173/ */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Shows Login Page on http://localhost:5173/login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Shows Dashboard on http://localhost:5173/dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university-registraction" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminApprovalPage />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />

        
      </Routes>
    </Router>
  );
}

export default App;