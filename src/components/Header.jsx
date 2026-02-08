import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, CalendarDays, 
  CreditCard, ChevronDown, UserCircle, LogOut, Settings, 
  FileText, ClipboardCheck, PlayCircle, History, UserCheck, X 
} from 'lucide-react';

const NAV_DATA = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} />, link: '/studentDashboard' },
  { 
    name: 'Exam', 
    icon: <GraduationCap size={18} />, 
    subLinks: [
      { name: 'Admit Card', link: '/admit-card', icon: <FileText size={16} /> },
      { name: 'Results', link: '/studentResults', icon: <ClipboardCheck size={16} /> },
    ] 
  },
  { 
    name: 'Time Table', 
    icon: <CalendarDays size={18} />, 
    subLinks: [
      { name: 'Time Table', link: '/studentTimetable', icon: <CalendarDays size={16} /> },
      { name: 'Attendance', link: '/studentAttendance', icon: <UserCheck size={16} /> },
    ] 
  },
  { 
    name: 'Fees', 
    icon: <CreditCard size={18} />, 
    subLinks: [
      { name: 'Pay Fee', link: '/studentFee', icon: <PlayCircle size={16} /> },
      
    ] 
  },
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null);
  const location = useLocation();

  const closeMenus = () => {
    setIsProfileOpen(false);
    setActiveMobileSub(null);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 px-4 md:px-10 h-16 flex justify-between items-center border-b border-gray-100">
      
      {/* LEFT: Logo */}
      <Link to="/studentDashboard" className="flex-shrink-0" onClick={closeMenus}>
        <img src="/logo.png" alt="University Logo" className="h-9 md:h-11 object-contain" />
      </Link>

      {/* MIDDLE: Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 h-full">
        {NAV_DATA.map((item) => (
          <div key={item.name} className="relative group h-full flex items-center">
            {item.subLinks ? (
              <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 font-medium transition-colors cursor-pointer py-5">
                {item.icon} {item.name}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </div>
            ) : (
              <Link
                to={item.link}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  location.pathname === item.link ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            )}

            {/* Desktop Dropdown */}
            {item.subLinks && (
              <div className="absolute top-16 left-0 hidden group-hover:block w-52 pt-2">
                <div className="bg-white shadow-xl rounded-b-xl border border-gray-100 py-2 overflow-hidden">
                  {item.subLinks.map((sub) => (
                    <Link 
                      key={sub.name} 
                      to={sub.link} 
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        location.pathname === sub.link ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      {sub.icon} {/* Corrected: Rendering the sub-link icon here */}
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* RIGHT: Profile & Mobile Toggle */}
      <div className="relative flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 p-1 pl-3 rounded-full bg-gray-50 border border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
        >
          <span className="hidden md:inline text-sm font-semibold text-gray-700">Student Portal</span>
          {isProfileOpen ? <X size={28} className="text-blue-600" /> : <UserCircle size={28} className="text-blue-600" />}
        </motion.button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-14 w-72 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50"
            >
              {/* Mobile Menu Section */}
              <div className="lg:hidden p-4 border-b border-gray-100 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Navigation</p>
                {NAV_DATA.map((item) => (
                  <div key={item.name}>
                    {item.subLinks ? (
                       <button 
                        onClick={() => setActiveMobileSub(activeMobileSub === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full p-2 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer"
                       >
                        <div className="flex items-center gap-3">{item.icon} {item.name}</div>
                        <ChevronDown size={14} className={`transition-transform ${activeMobileSub === item.name ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link 
                        to={item.link} 
                        onClick={closeMenus}
                        className={`flex items-center gap-3 w-full p-2 rounded-lg ${
                          location.pathname === item.link ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
                        }`}
                      >
                        {item.icon} {item.name}
                      </Link>
                    )}
                    
                    {item.subLinks && activeMobileSub === item.name && (
                      <div className="ml-9 mt-1 space-y-1 border-l-2 border-blue-100 pl-4">
                        {item.subLinks.map(sub => (
                          <Link 
                            key={sub.name} 
                            to={sub.link} 
                            onClick={closeMenus} 
                            className="flex items-center gap-3 py-2 text-sm text-gray-500 hover:text-blue-600"
                          >
                            {sub.icon} {/* Corrected: Rendering the sub-link icon in mobile menu */}
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Profile/Settings Section */}
              <div className="p-2">
                <Link to="/settings" onClick={closeMenus} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl">
                  <Settings size={18} /> Settings
                </Link>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-left cursor-pointer">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;