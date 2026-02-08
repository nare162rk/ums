import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, CalendarDays, 
  CreditCard, ChevronDown, UserCircle, LogOut, Settings 
} from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, link: '#' },
    { name: 'Timetable', icon: <CalendarDays size={18} />, link: '#' },
    { name: 'Fees', icon: <CreditCard size={18} />, link: '#' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-full h-16 flex justify-between items-center">
        
        {/* LEFT: Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <img src="/logo.png" alt="Logo" className="h-15 w-15" />
        </motion.div>

        {/* MIDDLE: Desktop Nav (Hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              whileHover={{ y: -2, color: '#2563eb' }}
              className="flex items-center gap-2 transition-colors"
            >
              {item.icon} {item.name}
            </motion.a>
          ))}

          {/* Desktop Exam Dropdown */}
          <div className="relative group cursor-pointer">
            <motion.div whileHover={{ y: -2 }} className="flex items-center gap-1 group-hover:text-blue-600">
              <GraduationCap size={18} /> Exam <ChevronDown size={14} />
            </motion.div>
            <div className="absolute top-full left-0 hidden group-hover:block w-44 bg-white shadow-xl rounded-xl border border-gray-100 mt-2 py-2 overflow-hidden">
              <a href="#" className="block px-4 py-2 hover:bg-blue-50 text-sm transition-colors">Admit Card</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-50 text-sm transition-colors">Results</a>
            </div>
          </div>
        </nav>

        {/* RIGHT: Profile Menu (Trigger for Mobile) */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-transparent hover:border-blue-200 transition-all"
          >
            <UserCircle size={32} className="text-blue-600" />
            <span className="hidden md:inline font-medium text-gray-700">Student Name</span>
          </motion.button>

          {/* MOBILE & PROFILE DROWDOW */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 z-50"
              >
                {/* Mobile Links (Shown only inside profile dropdown on small screens) */}
                <div className="lg:hidden px-4 pb-3 border-b border-gray-100 flex flex-col gap-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Navigation</p>
                  {navLinks.map((item) => (
                    <a key={item.name} href={item.link} className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600">
                      {item.icon} {item.name}
                    </a>
                  ))}
                  
                  {/* Mobile Exam Accordion */}
                  <div className="py-2">
                    <button 
                      onClick={() => setExamOpen(!examOpen)}
                      className="flex items-center justify-between w-full text-gray-700"
                    >
                      <div className="flex items-center gap-3"><GraduationCap size={18}/> Exam</div>
                      <ChevronDown size={14} className={examOpen ? 'rotate-180 transition-transform' : ''} />
                    </button>
                    {examOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-8 mt-2 space-y-2 text-sm text-gray-500">
                        <a href="#" className="block py-1 hover:text-blue-600">Admit Card</a>
                        <a href="#" className="block py-1 hover:text-blue-600">Results</a>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Common Profile Links */}
                <div className="pt-2">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={18} /> Settings
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={18} /> Logout
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;