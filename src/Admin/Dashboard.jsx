import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. Import Header and Footer
import Header from '../components/Header';
import Footer from '../components/Footer'; 

import { 
  Users, ShieldCheck, Activity, 
  Database, Globe, Zap, Settings, 
  Lock, Server, AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('System Logs');
  const tabs = ['System Logs', 'Access Requests', 'Security Alerts'];

  const adminData = {
    name: "Narendra",
    empId: "GB-ADMIN-001",
    role: "System Administrator",
    department: "Executive Control",
    branch: "Global Operations",
    status: "Root Access",
    serverUptime: "99.98%"
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    }
  };

  return (
    <>
      {/* 2. Place Header at the top */}
      <Header />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 font-sans"
      >
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Admin Title Bar */}
          <motion.div variants={cardVariants} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
           
            
            <div className="flex gap-3">
               <div className="bg-white p-3 px-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Activity size={18}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">System Pulse</p>
                    <p className="text-xs font-bold text-emerald-600">All Nodes Active</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Admin Identity & System Health */}
            <motion.div variants={cardVariants} className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-300/30 p-8 sticky top-24"> {/* Increased top for sticky to clear header */}
                
                {/* Profile Avatar with Admin Ring */}
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-slate-900/20 rounded-[3rem]"
                  />
                  <div className="absolute inset-2 bg-white-900 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center">
                     <img
                     src="/logo.png"
                     alt="Security"
                     className="w-20 h-20 object-contain"
                    />
                 </div>

                  <div className="absolute -bottom-1 -right-1 bg-blue-500 border-4 border-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center">
                      <Zap size={14} className="text-white" fill="white" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{adminData.name}</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">{adminData.role}</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{adminData.status}</span>
                  </div>
                </div>

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-8">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <Database size={14} className="text-slate-400 mb-1"/>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Database</p>
                      <p className="text-xs font-black text-slate-800">Optimized</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <Globe size={14} className="text-slate-400 mb-1"/>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Region</p>
                      <p className="text-xs font-black text-slate-800">AP-South-1</p>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { label: "Admin ID", value: adminData.empId, icon: "🆔" },
                    { label: "Authority", value: "Full Access", icon: "🔑" },
                    { label: "Uptime", value: adminData.serverUptime, icon: "📈" }
                  ].map((info, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-bold text-slate-400 text-[10px] uppercase flex items-center gap-2">
                        {info.icon} {info.label}
                      </span>
                      <span className="text-slate-700 font-black text-xs">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: System Hub */}
            <motion.div variants={cardVariants} className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Global Metrics Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                      { label: "Total Traffic", value: "2,460", icon: <Server size={20}/>, color: "text-blue-500" },
                      { label: "Active Admins", value: "04", icon: <Lock size={20}/>, color: "text-indigo-500" },
                      { label: "Pending Tasks", value: "12", icon: <AlertTriangle size={20}/>, color: "text-amber-500" }
                  ].map((m, i) => (
                      <motion.div whileHover={{ y: -5 }} key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
                          <div className={`${m.color}`}>{m.icon}</div>
                          <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</p>
                              <p className="text-lg font-black text-slate-800 tracking-tighter">{m.value}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>

              {/* Management Hub */}
              <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-300/30 overflow-hidden flex-grow flex flex-col">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                         <Settings size={18} className="text-slate-400" /> Management Hub
                      </h3>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 w-fit">
                    {tabs.map((tab) => (
                      <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                          activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Animated Content Area */}
                  <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 min-h-[300px] flex items-center justify-center p-12 text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
                              <Activity size={32} className="text-slate-200" />
                           </div>
                           <h4 className="text-slate-800 font-black uppercase tracking-tight">Console Secure</h4>
                           <p className="text-xs text-slate-400 font-medium mt-2">
                              The {activeTab.toLowerCase()} queue is currently empty. <br/>System is operating within normal parameters.
                           </p>
                        </motion.div>
                      </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* 3. Place Footer at the bottom */}
      <Footer />
    </>
  );
};

export default AdminDashboard;