import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, CalendarDays, 
  CreditCard, ChevronDown, UserCircle, LogOut, Settings,
  Facebook, Instagram, Linkedin, Youtube, 
  Mail, Phone, MessageCircle 
} from 'lucide-react';

// --- HEADER COMPONENT ---
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
        <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </motion.div>

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

        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-transparent hover:border-blue-200 transition-all"
          >
            <UserCircle size={32} className="text-blue-600" />
            <span className="hidden md:inline font-medium text-gray-700">Aarav Mehta</span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 z-50"
              >
                <div className="lg:hidden px-4 pb-3 border-b border-gray-100 flex flex-col gap-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Navigation</p>
                  {navLinks.map((item) => (
                    <a key={item.name} href={item.link} className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600">
                      {item.icon} {item.name}
                    </a>
                  ))}
                  <div className="py-2">
                    <button onClick={() => setExamOpen(!examOpen)} className="flex items-center justify-between w-full text-gray-700">
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

// --- FOOTER COMPONENT ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <Instagram size={18} />, color: 'hover:text-pink-500', link: '#' },
    { icon: <Linkedin size={18} />, color: 'hover:text-blue-500', link: '#' },
    { icon: <Facebook size={18} />, color: 'hover:text-blue-600', link: '#' },
    { icon: <Youtube size={18} />, color: 'hover:text-red-500', link: '#' },
    { icon: <MessageCircle size={18} />, color: 'hover:text-green-500', link: '#' },
  ];

  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-6 px-4 md:px-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <motion.a whileHover={{ scale: 1.05, color: '#fff' }} href="mailto:admin@umsystems.in" className="flex items-center gap-2 transition-colors">
              <Mail size={16} className="text-blue-500" /> admin@umsystems.in
            </motion.a>
            <motion.a whileHover={{ scale: 1.05, color: '#fff' }} href="tel:+910000000000" className="flex items-center gap-2 transition-colors">
              <Phone size={16} className="text-blue-500" /> +91 00000 00000
            </motion.a>
          </div>
          <div className="flex gap-5">
            {socialLinks.map((social, index) => (
              <motion.a key={index} href={social.link} whileHover={{ y: -4, scale: 1.2 }} whileTap={{ scale: 0.9 }} className={`${social.color} transition-colors duration-300`}>
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />
        <div className="text-center space-y-2">
          <p className="text-[11px] md:text-xs tracking-wider uppercase text-gray-500">© {currentYear} UMSystems. All rights reserved.</p>
          <div className="text-[13px] flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span className="text-gray-400">Designed & Developed by</span>
            <motion.span whileHover={{ color: '#60a5fa' }} className="text-white font-semibold cursor-default">UMSystems</motion.span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Powered by</span>
            <motion.span whileHover={{ letterSpacing: '1px' }} className="text-green-500 font-bold transition-all">GRAMBASKET PVT LIMITED</motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- DASHBOARD PAGE COMPONENT ---
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Notification');
  const tabs = ['Notification', 'Circular', 'Student Announcement'];

  const studentData = {
    name: "Aarav Mehta",
    enrollment: "STU2025CS01",
    internalId: "600000000007",
    batch: "UMS-BTech-CSE| 2 | 59",
    course: "UMS-1 - BTech - CSE (Semester - 6)",
    dob: "18-09-2005",
    phone: "9012345678",
    father: "Suresh Mehta| 9898765432",
    mother: "Anita Mehta| 9123987654",
    email: "Grambasket@ums.ac.in",
    AltEmail: "UMS@gmail.com"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.03, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 400, damping: 30 } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-grow p-4 md:p-8 font-sans text-gray-700 relative overflow-hidden bg-[#f1f5f9]"
      >
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <motion.div 
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ x: [0, -30, 0], y: [0, -40, 0] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -right-20 w-80 h-80 bg-indigo-100/40 rounded-full blur-[100px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Page Title Section */}
          <motion.div variants={itemVariants} className="mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            <h1 className="text-2xl text-slate-800 font-bold tracking-tight">Dashboard</h1>
            <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500 font-black uppercase tracking-widest shadow-sm">
              {studentData.name}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Profile Card */}
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="lg:col-span-3 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-6 text-center h-fit">
              <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="relative w-32 h-32 mx-auto mb-4 p-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-[2rem] shadow-lg">
                <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden">
                  <img src="/photo.jpeg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              <h2 className="font-black text-slate-800 text-base uppercase mb-1 tracking-tight">{studentData.name}</h2>
              <motion.span animate={{ opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block bg-[#46be8a] text-white text-[9px] px-3 py-0.5 rounded-full uppercase font-bold tracking-widest shadow-sm mb-4">
                ● Active
              </motion.span>
              
              <div className="mt-4 text-left text-[11px] leading-relaxed space-y-3 border-t border-slate-100 pt-6">
                <p className="text-center text-blue-600 font-black pb-2 border-b border-blue-50 italic">{studentData.course}</p>
                <div className="bg-slate-50/50 rounded-2xl p-3 border border-slate-100 text-center">
                  <p className="font-black text-slate-700 text-xs tracking-tighter">{studentData.enrollment}</p>
                  <p className="text-[9px] text-slate-400 font-mono italic">{studentData.internalId}</p>
                </div>
                <p className="text-center text-slate-400 font-bold uppercase tracking-tighter text-[10px]">{studentData.batch}</p>
                <div className="space-y-3 pt-2">
                  {[
                    { label: "DOB", value: studentData.dob },
                    { label: "Phone", value: studentData.phone },
                    { label: "Father", value: studentData.father.split('|')[0] },
                    { label: "Mother", value: studentData.mother.split('|')[0] }
                  ].map((info, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-help">
                      <span className="font-bold text-slate-400 text-[10px]">{info.label}:</span>
                      <span className="text-slate-800 font-black">{info.value}</span>
                    </div>
                  ))}
                  <div className="flex flex-col pt-2 gap-1">
                    <span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Email:</span>
                    <span className="text-blue-500 font-bold truncate hover:underline cursor-pointer transition-all">{studentData.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notification Section */}
            <motion.div variants={itemVariants} className="lg:col-span-9 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col overflow-hidden min-h-[500px]">
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-blue-600 text-[11px] font-black mb-6 tracking-[0.2em] uppercase">
                  <span className="mr-3 text-lg">📢</span> INFORMATION HUB
                </div>
                <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-6">
                  {tabs.map((tab) => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`relative flex-1 px-4 py-3 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all duration-200 ${
                        activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeGlow" className="absolute inset-0 bg-blue-500/5 rounded-xl -z-10" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-50/30 rounded-3xl flex-grow border border-dashed border-slate-200 min-h-[250px] flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.05, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-4 p-10 text-center">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-3xl">📁</motion.div>
                      <div>
                        <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">All Caught Up!</p>
                        <p className="text-[10px] font-bold text-slate-400 italic">No new {activeTab.toLowerCase()} entries found.</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;