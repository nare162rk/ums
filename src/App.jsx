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
import StudentPortal from './student/studentprofile';
import StudentTimetable from './student/studentTimeTable';
import StudentAttendance from './student/studentAttendance';
import Results from './student/Result';
import FeePortal from './student/Fee';

import AdminAttendanceS from './Admin/adminAtt(students)';
import AdminAttendance from './Admin/adminAttendance';
import AdminDashboard from './Admin/Dashboard';
import AdminProfile from './Admin/Profile';
import AdminTimetableManager from './Admin/TimetableManager';

import StaffAttendance from './staff/attendance';
import StaffDashboard from './staff/Dashboard';
import StaffProfile from './staff/profile';
import StaffTimetable from './staff/Timetable';

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
          <Route path="/studentProfile" element={<StudentPortal />} />
           <Route path="/studentTimetable" element={<StudentTimetable />} />


        <Route path="/StudentAttendance" element={<StudentAttendance/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/FeePortal" element={<FeePortal/>} />
        <Route path="/staffattendance" element={<StaffAttendance/>} />
        <Route path="/staffDashboard" element={<StaffDashboard/>} />
        <Route path="/staffprofile" element={<StaffProfile/>} />
        <Route path="/staffTimetable" element={<StaffTimetable/>} />


        <Route path="/AdminAttendanceS" element={<AdminAttendanceS/>} />
        <Route path="/AdminAttendance" element={<AdminAttendance/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/AdminProfile" element={<AdminProfile/>} />
        <Route path="/AdminTimetableManager" element={<AdminTimetableManager/>} />
      </Routes>
    </Router>
  );
}

export default App;