import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {   
  LayoutDashboard, GraduationCap, CalendarDays,   
  CreditCard, ChevronDown, UserCircle, LogOut, Settings,   
  FileText, ClipboardCheck, PlayCircle, UserCheck, X, Building2
} from 'lucide-react';

// --- NAV_CONFIG DEFINITION ---
const NAV_CONFIG = {
  student: [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, link: '/student-dashboard' },
    { 
      name: 'Exam', 
      icon: <GraduationCap size={18} />, 
      subLinks: [
        { name: 'Admit Card', link: '/admit-card', icon: <FileText size={16} /> },
        { name: 'Results', link: '/results', icon: <ClipboardCheck size={16} /> },
      ] 
    },
    { 
      name: 'Time Table', 
      icon: <CalendarDays size={18} />, 
      subLinks: [
        { name: 'Time Table', link: '/student-timetable', icon: <CalendarDays size={16} /> },
        { name: 'Attendance', link: '/student-attendance', icon: <UserCheck size={16} /> },
      ] 
    },
    { 
      name: 'Fees', 
      icon: <CreditCard size={18} />, 
      subLinks: [{ name: 'Pay Fee', link: '/fee-portal', icon: <PlayCircle size={16} /> }] 
    },
  ],
  admin: [
    { name: 'Admin Dashboard', icon: <LayoutDashboard size={18} />, link: '/admin-dashboard' },
    { 
      name: 'Management', 
      icon: <CalendarDays size={18} />, 
      subLinks: [
        { name: 'Timetable Manager', link: '/admin-timetable-manager', icon: <CalendarDays size={16} /> },
        { name: 'Staff Attendance', link: '/admin-attendance', icon: <UserCheck size={16} /> },
        { name: 'Student Attendance', link: '/admin-attendance-students', icon: <UserCheck size={16} /> },
      ] 
    },
    { name: 'Admin Profile', icon: <UserCircle size={18} />, link: '/admin-profile' },
  ],
  staff: [
    { name: 'Staff Dashboard', icon: <LayoutDashboard size={18} />, link: '/staff-dashboard' },
    { 
      name: 'Schedule', 
      icon: <CalendarDays size={18} />, 
      subLinks: [
        { name: 'Timetable', link: '/staff-timetable', icon: <CalendarDays size={16} /> },
        { name: 'Attendance', link: '/staff-attendance', icon: <UserCheck size={16} /> },
      ] 
    },
    { name: 'Staff Profile', icon: <UserCircle size={18} />, link: '/staff-profile' },
  ]
};

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState('student');
  const [instituteLogo, setInstituteLogo] = useState("/logo.png"); // Local fallback
  const location = useLocation();
  const navigate = useNavigate();
  const [instituteName, setInstituteName] = useState("Portal Gateway");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // 1. Set Nav Role
      if (user.role === 'uni-admin' || user.role === 'sys-admin') {
        setCurrentRole('admin');
      } else {
        setCurrentRole(user.role);
      }

      // 2. LOGO LOGIC
      // If the logged-in user is a sys-admin (Your Employee), show your logo
      if (user.role === 'sys-admin') {
        setInstituteLogo("/logo.png");
      } 
      // If the user has a 'logo' field in the saved object, use it!
      else if (user.logo) {
        setInstituteLogo(user.logo);
      } else {
        setInstituteLogo("/logo.png");
      }
      setInstituteName(user.name || "Portal Gateway");
    }
  }, [location]);

  const navData = NAV_CONFIG[currentRole] || NAV_CONFIG.student;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 px-4 md:px-10 h-25 flex justify-between items-center border-b border-gray-100">
      
      {/* LEFT: Dynamic Institute Logo */}
      <Link to={`/${currentRole}-dashboard`} className="flex-shrink-0 flex items-center gap-3">
        <div className="h-20 w-20 flex items-center justify-center overflow-hidden rounded-lg bg-white border border-slate-100 shadow-sm">
          {instituteLogo ? (
            <img 
              src={instituteLogo} 
              alt="Logo" 
              className="h-full w-full object-contain p-1"
              onError={(e) => e.target.src = "/logo.png"} 
            />
          ) : (
            <Building2 className="text-slate-300" size={24} />
          )}
        </div>
        <span className="hidden sm:block font-black text-slate-800 text-[20px] uppercase tracking-widest">
           {instituteName} UMS PORTAL
        </span>
      </Link>

      {/* MIDDLE: Navigation */}
      <nav className="hidden lg:flex items-center gap-8 h-full">
        {navData.map((item) => (
          <div key={item.name} className="relative group h-full flex items-center">
            {item.subLinks ? (
              <div className="flex items-center gap-2 text-slate-600 group-hover:text-indigo-600 font-bold text-xs transition-colors cursor-pointer py-5 uppercase tracking-tighter">
                {item.icon} {item.name}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </div>
            ) : (
              <Link
                to={item.link}
                className={`flex items-center gap-2 font-bold text-xs uppercase tracking-tighter transition-colors ${
                  location.pathname === item.link ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            )}

            {item.subLinks && (
              <div className="absolute top-16 left-0 hidden group-hover:block w-52 pt-2">
                <div className="bg-white shadow-2xl rounded-2xl border border-slate-100 py-2 overflow-hidden">
                  {item.subLinks.map((sub) => (
                    <Link 
                      key={sub.name} 
                      to={sub.link} 
                      className={`flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                        location.pathname === sub.link ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                      }`}
                    >
                      {sub.icon} {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* RIGHT: Profile */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 p-1.5 pl-4 rounded-full bg-slate-50 border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer"
        >
          <span className="hidden md:inline text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            {currentRole}
          </span>
          <UserCircle size={26} className="text-indigo-600" />
        </motion.button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-14 w-64 bg-white shadow-2xl rounded-3xl border border-slate-100 overflow-hidden z-50 p-2"
            >
              <Link to={`/${currentRole}-profile`} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors">
                <Settings size={18} /> Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl text-left transition-colors cursor-pointer"
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;