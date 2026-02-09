import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==========================================
// 1. GENERAL & AUTHENTICATION PAGES
// ==========================================
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegistrationPage from './pages/RegistrationPage';
import AdminApprovalPage from './pages/AdminApprovalPage';

// Shared Components
import Header from './components/Header';
import Footer from './components/Footer';

// ==========================================
// 2. STUDENT SECTION
// ==========================================
import StudentDashboard from './student/dashboard';
import StudentPortal from './student/studentprofile';
import StudentTimetable from './student/studentTimeTable';
import StudentAttendance from './student/studentAttendance';
import Results from './student/Result';
import FeePortal from './student/Fee';

// ==========================================
// 3. STAFF SECTION
// ==========================================
import StaffDashboard from './staff/Dashboard';
import StaffProfile from './staff/profile';
import StaffAttendance from './staff/attendance';
import StaffTimetable from './staff/Timetable';

// ==========================================
// 4. ADMIN SECTION
// ==========================================
import AdminDashboard from './Admin/Dashboard';
import AdminProfile from './Admin/Profile';
import AdminAttendance from './Admin/adminAttendance';
import AdminAttendanceS from './Admin/adminAtt(students)';
import AdminTimetableManager from './Admin/TimetableManager';

function App() {
  return (
    <Router>
      <Routes>
        
       {/* ==========================================
           1. GENERAL & AUTHENTICATION PAGES
          ==========================================*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university-registration" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminApprovalPage />} />


        {/*==========================================
              UI Component Previews (Optional) 
         ========================================== */}
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />


        {/* ==========================================
                        Student Routes 
           ========================================== */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentPortal />} />
        <Route path="/student-timetable" element={<StudentTimetable />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/results" element={<Results />} />
        <Route path="/fee-portal" element={<FeePortal />} />


        {/* ==========================================
                        Staff Routes 
            ========================================== */}
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
        <Route path="/staff-attendance" element={<StaffAttendance />} />
        <Route path="/staff-timetable" element={<StaffTimetable />} />


        {/* ==========================================
                      Admin Routes 
            ========================================== */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-attendance" element={<AdminAttendance />} />
        <Route path="/admin-attendance-students" element={<AdminAttendanceS />} />
        <Route path="/admin-timetable-manager" element={<AdminTimetableManager />} />
      </Routes>
    </Router>
  );
}

export default App;