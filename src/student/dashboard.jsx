import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Fast & Snappy Animation Variants
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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-4 md:p-8 font-sans text-gray-700 relative overflow-hidden bg-[#f1f5f9]"
    >
      {/* Dynamic Animated Mesh Background */}
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

      {/* Page Title Section */}
      <motion.div variants={itemVariants} className="mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-600 rounded-full" />
        <h1 className="text-2xl text-slate-800 font-bold tracking-tight">Dashboard</h1>
        <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500 font-black uppercase tracking-widest shadow-sm">
          {studentData.name}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Profile Card (Left) */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="lg:col-span-3 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-6 text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-32 h-32 mx-auto mb-4 p-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-[2rem] shadow-lg"
          >
            <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden">
              <img src="/photo.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <h2 className="font-black text-slate-800 text-base uppercase mb-1 tracking-tight">{studentData.name}</h2>
          <motion.span 
            animate={{ opacity: [1, 0.6, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block bg-[#46be8a] text-white text-[9px] px-3 py-0.5 rounded-full uppercase font-bold tracking-widest shadow-sm mb-4"
          >
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
                { label: "DOB", value: studentData.dob, icon: "📅" },
                { label: "Phone", value: studentData.phone, icon: "📱" },
                { label: "Father", value: studentData.father.split('|')[0], icon: "👨‍💼" },
                { label: "Mother", value: studentData.mother.split('|')[0], icon: "👩‍💼" }
              ].map((info, i) => (
                <motion.div key={i} whileHover={{ x: 3 }} className="flex justify-between items-center group cursor-help">
                  <span className="font-bold text-slate-400 text-[10px] flex items-center gap-2">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">{info.icon}</span>
                    {info.label}:
                  </span>
                  <span className="text-slate-800 font-black">{info.value}</span>
                </motion.div>
              ))}
              
              <div className="flex flex-col pt-2 gap-1">
                <span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Primary Email:</span>
                <span className="text-blue-500 font-bold truncate hover:underline cursor-pointer transition-all">
                  {studentData.email}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Section (Right) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col overflow-hidden"
        >
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center text-blue-600 text-[11px] font-black mb-6 tracking-[0.2em] uppercase">
                <span className="mr-3 text-lg">📢</span> INFORMATION HUB
            </div>
            
            {/* Tabs Header */}
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
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-blue-500/5 rounded-xl -z-10"
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="bg-slate-50/30 rounded-3xl flex-grow border border-dashed border-slate-200 min-h-[250px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-4 p-10 text-center"
                  >
                    <motion.div 
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-3xl"
                    >
                      📁
                    </motion.div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">All Caught Up!</p>
                      <p className="text-[10px] font-bold text-slate-400 italic">
                        No new {activeTab.toLowerCase()} entries found.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default StudentDashboard;
