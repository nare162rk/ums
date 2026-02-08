import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const StudentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDetail, setViewDetail] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentCode = "24081"; // B.Tech Cybersecurity student

  // --- API FETCH: Attendance Summary ---
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/attendance/stats/${studentCode}`);
        const data = await response.json();
        
        if (data && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching attendance stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [studentCode]);

  // --- API FETCH: Daily Detail ---
  const handleDateClick = async (day) => {
    // Formatting date to match DB keys: DD-MM-YYYY
    const formattedDateForDB = `${day}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
    const displayDate = `${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    try {
      const response = await fetch(`http://localhost:5000/attendance/detail/${studentCode}/${formattedDateForDB}`);
      const data = await response.json();

      setViewDetail({
        date: displayDate,
        status: data.status || "No Record",
        slots: data.slots || "N/A"
      });
    } catch (error) {
      console.error("Error fetching day detail:", error);
    }
  };

  // --- Calendar Helpers ---
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-indigo-600 font-bold animate-bounce text-xl">Loading Attendance...</p>
            <p className="text-gray-400 text-sm">Fetching records for Student ID: {studentCode}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback in case stats are missing
  const currentStats = stats || {
    attendanceSummary: { totalSlots: 0, presentSlots: 0, absentSlots: 0, percentage: 0 },
    absentDays: { partialAbsent: 0, fullAbsent: 0, totalAbsentSlots: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-slate-900">
      <Header />

      <main className="flex-grow p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* --- Stats Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.section 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <motion.h2 
                animate={{ color: ["#1e40af", "#4338ca", "#0f766e"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-xl font-bold mb-4"
              >
                Attendance Summary
              </motion.h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Total Slots" value={currentStats.attendanceSummary.totalSlots} />
                <StatCard label="Present Slots" value={currentStats.attendanceSummary.presentSlots} />
                <StatCard label="Absent Slots" value={currentStats.attendanceSummary.absentSlots} />
                <StatCard label="Present %" value={`${currentStats.attendanceSummary.percentage}%`} highlight />
              </div>
            </motion.section>

            <motion.section 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-red-700 mb-4">Absent Days</h2>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Partial Absent" value={currentStats.absentDays.partialAbsent} />
                <StatCard label="Full Absent" value={currentStats.absentDays.fullAbsent} />
                <StatCard label="Total Absent Slots" value={currentStats.absentDays.totalAbsentSlots} />
              </div>
            </motion.section>
          </div>

          {/* --- Calendar Section --- */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Month View</h2>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-50 text-indigo-700 px-6 py-2 rounded-full font-bold shadow-sm"
              >
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </motion.div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase py-2">{d}</div>
              ))}
              
              {/* Padding for first day of month */}
              {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
              
              {/* Day buttons */}
              {[...Array(daysInMonth(selectedDate))].map((_, i) => (
                <motion.button
                  key={i + 1}
                  whileHover={{ scale: 1.1, backgroundColor: "#eff6ff", borderColor: "#6366f1" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDateClick(i + 1)}
                  className="h-12 flex items-center justify-center rounded-lg border border-gray-50 transition-all text-gray-700 font-medium"
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>

            {/* --- Detail Overlay --- */}
            <AnimatePresence>
              {viewDetail && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl relative overflow-hidden"
                >
                  <button 
                    onClick={() => setViewDetail(null)}
                    className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="pr-8">
                    <h3 className="font-bold text-blue-900 text-lg">Details for {viewDetail.date}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-blue-800">Status: <span className="font-bold">{viewDetail.status}</span></p>
                      <p className="text-blue-700 text-sm">Active Slots: <span className="font-semibold">{viewDetail.slots}</span></p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

// --- Sub-component: StatCard ---
const StatCard = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-lg border transition-all duration-300 ${
    highlight 
      ? 'bg-indigo-600 text-white shadow-lg border-indigo-700' 
      : 'bg-gray-50 border-gray-200 shadow-sm hover:border-indigo-300'
  }`}>
    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${
      highlight ? 'text-indigo-100' : 'text-gray-400'
    }`}>
      {label}
    </p>
    <p className="text-2xl font-black">{value}</p>
  </div>
);

export default StudentAttendance;