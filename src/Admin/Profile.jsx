import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const adminData = {
    name: "Dr. Rajesh K. Varma",
    adminID: "PU-ADM-2026-882", // Standard Indian University ID format
    role: "Chief Registrar / HOD",
    department: "Cyber Security & Forensic Dept.",
    accessLevel: "Tier 1 (State-Wide Access)",
    email: "rk.varma@paruluniversity.ac.in",
    lastLogin: "Feb 08, 2026 - 10:45 AM (IST)",
    ipAddress: "49.36.120.14", // Example Indian ISP IP
    assignedCampus: "Vadodara Central / Palnadu Satellite Campus",
    phone: "+91 98480 22334",
    aadhaar: "XXXX-XXXX-9012",
    officeLocation: "Admin Block-A, Cabin 402, Parul University"
  };

  const tabs = ['OVERVIEW', 'COMPLIANCE', 'SYSTEM LOGS', 'NOTIFICATIONS'];

  const InfoBlock = ({ label, value }) => (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      className="flex flex-col gap-1"
    >
      <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-slate-800">{value}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden font-sans bg-[#f8fafc]">
      {/* Mesh Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }} 
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
             <h1 className="text-3xl font-black text-[#0f172a] tracking-tighter italic">
               Campus<span className="text-[#6366f1]">Admin</span>
             </h1>
             <div className="h-1.5 w-14 bg-[#6366f1] rounded-full mt-1" />
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 border border-slate-200">
            <span className="text-xs font-black text-slate-500 uppercase">Region: India (West/South)</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Localized Admin Card */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white text-center"
          >
            <div className="relative w-40 h-40 mx-auto mb-6">
              <img 
                src="https://ui-avatars.com/api/?name=Rajesh+Varma&background=6366f1&color=fff&size=200" 
                alt="Admin" 
                className="relative w-full h-full object-cover rounded-[2.5rem] border-4 border-white shadow-xl" 
              />
            </div>

            <h2 className="text-xl font-black text-slate-800">{adminData.name}</h2>
            <p className="text-[10px] font-bold text-[#6366f1] uppercase tracking-widest mt-1">{adminData.role}</p>

            <div className="mt-8 bg-slate-100/50 rounded-2xl p-4 text-left border border-slate-200">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Campus Jurisdiction</span>
              <p className="text-[11px] font-bold text-slate-700 leading-tight mt-1">{adminData.assignedCampus}</p>
            </div>
          </motion.aside>

          {/* Right Side: Tabbed Data */}
          <motion.main 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden"
          >
            <div className="flex bg-slate-50/80 p-2 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
                    activeTab === tab ? 'bg-white text-[#6366f1] shadow-sm' : 'text-slate-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-10 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden" animate="visible" exit="hidden"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12"
                >
                  {activeTab === 'OVERVIEW' && (
                    <>
                      <InfoBlock label="Aadhaar Reference" value={adminData.aadhaar} />
                      <InfoBlock label="University Email" value={adminData.email} />
                      <InfoBlock label="Direct Contact" value={adminData.phone} />
                      <InfoBlock label="Admin ID" value={adminData.adminID} />
                      <InfoBlock label="Current IP (India)" value={adminData.ipAddress} />
                      <InfoBlock label="Duty Station" value={adminData.officeLocation} />
                      <InfoBlock label="Timezone" value="Asia/Kolkata (GMT+5:30)" />
                    </>
                  )}
                  {activeTab === 'COMPLIANCE' && (
                    <div className="col-span-full">
                       <p className="text-sm font-bold text-slate-800">UGC & AICTE Compliance Status</p>
                       <p className="text-xs text-green-600 mt-2 font-black uppercase tracking-widest">● Verified for 2025-26 Academic Year</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Server: MH-West-1</span>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="bg-[#1e1b4b] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
              >
                Download Audit Report
              </motion.button>
            </div>
          </motion.main>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;