import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, AlertCircle, CheckCircle, 
  Calendar as CalIcon, TrendingUp, DollarSign, X 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

const StaffAttendance = () => {
  const [viewDetail, setViewDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'working', 'presence', 'remaining'
  
  const staffId = "GB-STF-101"; 
  const today = new Date(); // Feb 8, 2026
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // --- Dynamic Calculations ---
  const stats = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let totalWorking = 0;
    let presentSoFar = 0;
    let holidays = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const isSunday = date.getDay() === 0;
      
      if (!isSunday) totalWorking++;
      else holidays.push(d);

      if (d <= today.getDate() && !isSunday) presentSoFar++;
    }

    return {
      totalWorking,
      presentSoFar,
      absentSoFar: 0, // Assuming 100% attendance for Feb first week
      remaining: daysInMonth - today.getDate(),
      holidays,
      daysInMonth
    };
  }, [currentMonth, currentYear]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const getDayStyles = (day) => {
    const isHoliday = stats.holidays.includes(day);
    const isPast = day <= today.getDate();
    const isToday = day === today.getDate();

    if (activeFilter === 'working') {
      return isHoliday ? 'bg-red-100 border-red-200 text-red-600' : 'bg-green-100 border-green-200 text-green-600';
    }
    if (activeFilter === 'presence') {
      if (isHoliday) return 'bg-slate-100 text-slate-400';
      return isPast ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-orange-50 border-orange-200 text-orange-400';
    }
    if (activeFilter === 'remaining') {
      return day > today.getDate() ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white text-slate-300';
    }
    return isToday ? 'ring-2 ring-indigo-500 bg-white shadow-sm' : 'bg-white border-slate-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mb-4 text-indigo-600">
          <Users size={40} />
        </motion.div>
        <p className="font-bold text-slate-500 animate-pulse uppercase text-xs tracking-widest">Grambasket Systems...</p>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">N</div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Narendra</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Founder & CEO | ID: {staffId}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-700">Feb 2026</p>
            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> ONLINE
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Working Days" value={stats.totalWorking} icon={<CalIcon size={16}/>} active={activeFilter === 'working'} onClick={() => setActiveFilter('working')} />
          <StatCard label="Days Present" value={stats.presentSoFar} icon={<CheckCircle size={16}/>} color="text-emerald-600" active={activeFilter === 'presence'} onClick={() => setActiveFilter('presence')} />
          <StatCard label="Remaining Days" value={stats.remaining} icon={<Clock size={16}/>} color="text-indigo-600" active={activeFilter === 'remaining'} onClick={() => setActiveFilter('remaining')} />
          <StatCard label="Efficiency" value="100%" highlight icon={<TrendingUp size={16}/>} onClick={() => setActiveFilter('all')} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <motion.section variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Attendance Calendar</h2>
              {activeFilter !== 'all' && (
                <button onClick={() => setActiveFilter('all')} className="text-xs font-bold text-indigo-600 hover:underline">Reset View</button>
              )}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase pb-2">{d}</div>
              ))}
              {[...Array(new Date(currentYear, currentMonth, 1).getDay())].map((_, i) => <div key={`e-${i}`} />)}
              {[...Array(stats.daysInMonth)].map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewDetail({ 
                    day: i + 1, 
                    status: stats.holidays.includes(i + 1) ? 'Holiday' : (i + 1 <= today.getDate() ? 'Present' : 'Pending'),
                    in: '09:00 AM', out: '06:15 PM'
                  })}
                  className={`h-14 rounded-xl border text-sm font-bold transition-all flex items-center justify-center ${getDayStyles(i + 1)}`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Details & Payroll */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {viewDetail ? (
                <motion.div 
                  key={viewDetail.day}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden"
                >
                  <button onClick={() => setViewDetail(null)} className="absolute top-4 right-4 text-indigo-200 hover:text-white"><X size={18}/></button>
                  <h3 className="text-lg font-bold mb-4">{viewDetail.day} Feb 2026</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between"><span>Status</span><span className="font-bold bg-white/20 px-2 py-0.5 rounded">{viewDetail.status}</span></div>
                    <div className="flex justify-between"><span>Punch In</span><span className="font-bold">{viewDetail.in}</span></div>
                    <div className="flex justify-between"><span>Punch Out</span><span className="font-bold">{viewDetail.out}</span></div>
                    <div className="pt-4 border-t border-indigo-400 flex justify-between items-end">
                      <div><p className="text-[10px] opacity-70 uppercase font-bold">Total Work</p><p className="text-xl font-bold">9h 15m</p></div>
                      <div className="text-emerald-300 text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> On Time</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-100 border-2 border-dashed border-slate-200 p-8 rounded-2xl text-center text-slate-400 text-sm">
                  Select a date to view shift details
                </div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <DollarSign size={14}/> Payroll Preview
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm"><span>Overtime Hours</span><span className="font-bold text-indigo-600">12h</span></div>
                <div className="flex justify-between text-sm"><span>Leaves Used</span><span className="font-bold text-red-500">0</span></div>
                <div className="p-3 bg-emerald-50 rounded-xl flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-700">Estimated Payout</span>
                  <span className="text-lg font-black text-emerald-700">₹ --,---</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
    <Footer/>
    </>
  );
};

const StatCard = ({ label, value, highlight, color = "text-slate-800", icon, active, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`p-5 rounded-2xl border cursor-pointer transition-all ${active ? 'ring-2 ring-indigo-500 shadow-md' : 'shadow-sm'} ${highlight ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-100' : 'bg-white border-slate-100'}`}
  >
    <div className="flex justify-between items-start mb-2">
      <p className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{label}</p>
      <span className={highlight ? 'text-indigo-200' : 'text-slate-300'}>{icon}</span>
    </div>
    <p className={`text-3xl font-black ${highlight ? 'text-white' : color}`}>{value}</p>
  </motion.div>
);

export default StaffAttendance;