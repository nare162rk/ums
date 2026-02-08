import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Clock, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDetail, setViewDetail] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const adminCode = "ADM-101"; 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/attendance/stats/${adminCode}`);
        const data = await response.json();
        if (data.stats) setStats(data.stats);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [adminCode]);

  const handleDateClick = async (day) => {
    const formattedDateForDB = `${day}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
    const displayDate = `${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    try {
      const response = await fetch(`http://localhost:5000/admin/attendance/detail/${adminCode}/${formattedDateForDB}`);
      const data = await response.json();

      setViewDetail({
        date: displayDate,
        morning: data.morningStatus || "Present",
        evening: data.eveningStatus || "Present",
        totalHours: data.totalHours || "8.5"
      });
    } catch (error) {
      console.error("Error detail:", error);
    }
  };

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-slate-600 font-medium animate-pulse">Syncing Admin Records...</p>
      </div>
    );
  }

  const currentStats = stats || {
    summary: { totalDays: 22, presentDays: 20, halfDays: 1, percentage: 92 },
    workHours: { monthlyTotal: 168, averagePerDay: 8.2 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
          <div>
            <motion.h1 layout className="text-2xl font-black text-slate-800 tracking-tight">Admin Portal</motion.h1>
            <p className="text-slate-500 font-medium italic">Identification: {adminCode}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full border border-emerald-200"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-sm">System Online</span>
          </motion.div>
        </motion.div>

        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6 flex items-center gap-2">
               <CalendarIcon size={16}/> Attendance Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Total Days" value={currentStats.summary.totalDays} color="text-slate-700" />
              <StatCard label="Present" value={currentStats.summary.presentDays} color="text-emerald-600" />
              <StatCard label="Half Days" value={currentStats.summary.halfDays} color="text-orange-500" />
              <StatCard label="Efficiency" value={`${currentStats.summary.percentage}%`} highlight />
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6 flex items-center gap-2">
              <Clock size={16}/> Time Analytics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Total Hours" value={`${currentStats.workHours.monthlyTotal}h`} color="text-blue-600" />
              <StatCard label="Average/Day" value={`${currentStats.workHours.averagePerDay}h`} color="text-indigo-600" />
            </div>
          </motion.section>
        </div>

        {/* --- Calendar View --- */}
        <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Monthly Log</h2>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </motion.div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-7 gap-3 mb-4"
          >
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{d}</div>
            ))}
            
            {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
            {[...Array(daysInMonth(selectedDate))].map((_, i) => (
              <motion.button
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.1, backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDateClick(i + 1)}
                className="h-12 md:h-16 flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 transition-colors text-slate-600 font-bold text-lg"
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {viewDetail && (
              <motion.div 
                key={viewDetail.date}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="mt-8 p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-emerald-400 font-bold text-xl">Shift Logs: {viewDetail.date}</h3>
                    <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-mono">{viewDetail.totalHours} Total Hours</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LogEntry label="Morning Session" status={viewDetail.morning} icon={<Clock className="text-emerald-400" size={20}/>} />
                    <LogEntry label="Evening Session" status={viewDetail.evening} icon={<Clock className="text-orange-400" size={20}/>} />
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12">
                   <UserCheck size={200} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </motion.div>
  );
};

// Sub-components for better organization
const StatCard = ({ label, value, highlight, color }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`p-4 rounded-xl border transition-all ${highlight ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-200' : 'bg-slate-50 border-slate-200'}`}
  >
    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${highlight ? 'text-emerald-100' : 'text-slate-400'}`}>{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-white' : color}`}>{value}</p>
  </motion.div>
);

const LogEntry = ({ label, status, icon }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm"
  >
    <div className="p-3 bg-white/10 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</p>
      <div className="flex items-center gap-2">
        <p className="font-bold text-lg">{status}</p>
        <ChevronRight size={14} className="text-slate-500" />
      </div>
    </div>
  </motion.div>
);

export default AdminAttendance;