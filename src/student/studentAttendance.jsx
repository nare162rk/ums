import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added Framer Motion
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StudentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDetail, setViewDetail] = useState(null);

  // Mock Data
  const stats = {
    attendanceSummary: { totalSlots: 120, presentSlots: 102, absentSlots: 18, percentage: 85 },
    absentDays: { partialAbsent: 4, fullAbsent: 2, totalAbsentSlots: 18 }
  };

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const handleDateClick = (day) => {
    setViewDetail({
      date: `${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`,
      status: Math.random() > 0.2 ? "Present" : "Absent",
      slots: "8:00 AM - 4:00 PM"
    });
  };

  return (
    // Animation: Fade in and slide up on page load
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Heading Sections --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Attendance Summary */}
          <motion.section 
            whileHover={{ scale: 1.01 }} // Subtle pop on hover
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            {/* Animation: Color changing text */}
            <motion.h2 
              animate={{ color: ["#1e40af", "#1e293b", "#0f766e"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-xl font-bold mb-4"
            >
              Attendance Summary
            </motion.h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Total Slots" value={stats.attendanceSummary.totalSlots} />
              <StatCard label="Present Slots" value={stats.attendanceSummary.presentSlots} />
              <StatCard label="Absent Slots" value={stats.attendanceSummary.absentSlots} />
              <StatCard label="Present %" value={`${stats.attendanceSummary.percentage}%`} highlight />
            </div>
          </motion.section>

          {/* Absent Days */}
          <motion.section 
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-red-700 mb-4">Absent Days</h2>
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Partial Absent" value={stats.absentDays.partialAbsent} />
              <StatCard label="Full Absent" value={stats.absentDays.fullAbsent} />
              <StatCard label="Total Absent Slots" value={stats.absentDays.totalAbsentSlots} />
            </div>
          </motion.section>
        </div>

        {/* --- Month View --- */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Month View</h2>
            {/* Animation: Pop effect on the date badge */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-4 bg-gray-100 px-4 py-2 rounded-lg cursor-default"
            >
              <span className="font-semibold text-gray-700">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-sm font-medium text-gray-500 py-2">{d}</div>
            ))}
            
            {/* Calendar Grid */}
            {[...Array(firstDayOfMonth)].map((_, i) => <div key={i} />)}
            {[...Array(daysInMonth(selectedDate))].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, backgroundColor: "#eff6ff" }} // Arrow pass "Pop Up"
                whileTap={{ scale: 0.9 }} // Click animation
                onClick={() => handleDateClick(i + 1)}
                className="h-12 flex items-center justify-center rounded-lg border border-gray-50 transition-colors text-gray-700 font-medium"
              >
                {i + 1}
              </motion.button>
            ))}
          </div>

          {/* Detail View (Triggers on Click) */}
          <AnimatePresence>
            {viewDetail && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg overflow-hidden"
              >
                <h3 className="font-bold text-blue-900">Details for {viewDetail.date}</h3>
                <p className="text-blue-800">Status: <span className="font-semibold">{viewDetail.status}</span></p>
                <p className="text-blue-700 text-sm">Active Slots: {viewDetail.slots}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </motion.div>
  );
};

// Reusable Stat Component with Hover Pop
const StatCard = ({ label, value, highlight }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    className={`p-4 rounded-lg border transition-all ${highlight ? 'bg-blue-600 text-white border-blue-700 shadow-blue-200' : 'bg-gray-50 border-gray-200'}`}
  >
    <p className={`text-xs uppercase tracking-wider ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);

export default StudentAttendance;