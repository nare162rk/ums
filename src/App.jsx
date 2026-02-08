import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminApprovalPage from './pages/AdminApprovalPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentDashboard from './student/dashboard';
import StudentProfile from './student/studentprofile';
import StudentTimetable from './student/studentTimeTable';
import StudentAttendance from './student/studentAttendance';
import Results from './student/Result';
import FeePortal from './student/Fee';
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

        

         <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
           <Route path="/studentTimetable" element={<StudentTimetable />} />


        <Route path="/StudentAttendance" element={<StudentAttendance/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/FeePortal" element={<FeePortal/>} />


      </Routes>
    </Router>
  );
}

export default App;