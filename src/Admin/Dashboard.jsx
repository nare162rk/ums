import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

import { 
  Users, ShieldCheck, Activity, 
  Database, Globe, Zap, Settings, IdCard,
  Lock, Server, Building2,BadgeIndianRupee,
  Mail, Phone, MapPin, UserCircle, GraduationCap, Briefcase
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('System Logs');
  const [uniData, setUniData] = useState(null);
  const tabs = ['System Logs', 'Access Requests', 'Security Alerts'];

  // --- LOGIC: Fetch dynamic data from localStorage ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUniData(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Loading State
  if (!uniData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Zap className="text-indigo-600" size={48} />
        </motion.div>
      </div>
    );
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <Header logo={uniData.logo} instituteName={uniData.adminName} />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans"
      >
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Identity Section */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <motion.div 
                whileHover={{ shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 sticky top-24"
              >
                {/* Logo Section */}
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-[3rem]"
                  />
                  <div className="absolute inset-2 bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center">
                      {uniData.logo ? (
                        <img src={uniData.logo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Building2 size={48} className="text-slate-300" />
                      )}
                  </div>
                </div>

                <div className="text-center mb-8">
                  <motion.h2 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-tight">
                    {uniData.name}
                  </motion.h2>
                  <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                    {uniData.institutionType} Portal
                  </p>
                  
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mt-4 inline-flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      {uniData.status}
                    </span>
                  </motion.div>
                </div>

                {/* Identity Details */}
                <div className="space-y-5 pt-2">
                  <DetailRow icon={<Globe size={16}/>} label="University Admin Name" value={uniData.adminName} />
                  <DetailRow icon={<Globe size={16}/>} label="University ID" value={uniData.universityId} />
                  <DetailRow icon={<Mail size={16}/>} label="Official Email" value={uniData.officialEmail} isEmail />
                  <DetailRow icon={<Phone size={16}/>} label="Contact" value={uniData.contactNumber} />
                  <DetailRow icon={<BadgeIndianRupee size={16}/>} label="GST Number" value={uniData.gstNumber} />
                  <DetailRow icon={<IdCard size={16}/>} label="GST Number" value={uniData.panNumber} />
                  
                  <div className="flex flex-col pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-400 text-[9px] uppercase flex items-center gap-2 mb-1">
                      <MapPin size={12} /> Address
                    </span>
                    <span className="text-slate-700 font-medium text-[12px] leading-relaxed">
                      {uniData.address}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Stats & Notifications */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Animated Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard label="Students" value={uniData.studentCount || 0} icon={<GraduationCap/>} color="text-blue-500" />
                <StatCard label="Teaching Staff" value={uniData.teachingStaffCount || 0} icon={<Briefcase/>} color="text-indigo-500" />
                <StatCard label="Non-Teaching" value={uniData.nonTeachingStaffCount || 0} icon={<Users/>} color="text-emerald-500" />
                <StatCard label="Admins" value={uniData.adminCount || 0} icon={<ShieldCheck/>} color="text-amber-500" />
                <StatCard label="Counselors" value={uniData.counselorCount || 0} icon={<UserCircle/>} color="text-rose-500" />
                <StatCard label="System Status" value="Online" icon={<Zap/>} color="text-purple-500" />
              </div>

              {/* Notification Hub */}
              <motion.div 
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-300/20 overflow-hidden flex-grow"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                         <Settings size={18} className="text-slate-400" /> Administrative Hub
                      </h3>
                  </div>

                  <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 w-fit overflow-x-auto">
                    {tabs.map((tab) => (
                      <motion.button 
                        key={tab} 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                          activeTab === tab ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {tab}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 min-h-[300px] flex flex-col items-center justify-center p-12 text-center"
                    >
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6"
                        >
                           <Activity size={32} className="text-slate-200" />
                        </motion.div>
                        <h4 className="text-slate-800 font-black uppercase tracking-tight">Stream Clear</h4>
                        <p className="text-xs text-slate-400 font-medium mt-2">
                          No pending {activeTab.toLowerCase()} for {uniData.adminName}.
                        </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
};

// Reusable Detail Row with Full Visibility
const DetailRow = ({ icon, label, value, isEmail = false }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex flex-col space-y-1"
  >
    <span className="font-bold text-slate-400 text-[9px] uppercase flex items-center gap-2">
      {icon} {label}
    </span>
    <span className={`text-slate-700 font-black tracking-tight ${isEmail ? 'text-[12px] break-all' : 'text-[13px]'}`}>
      {value || "N/A"}
    </span>
  </motion.div>
);

// Reusable Stat Card
const StatCard = ({ label, value, icon, color }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-5"
  >
    <div className={`${color} bg-slate-50 p-4 rounded-2xl`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-black text-slate-800 tracking-tighter"
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

export default AdminDashboard;