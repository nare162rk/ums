import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';

const AdminAttendanceS = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDetail, setViewDetail] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(""); // Input field state
  const [activeStudent, setActiveStudent] = useState(null); // Currently viewed student
  const [error, setError] = useState(null);

  // --- API FETCH: Attendance Summary for Admin ---
  const fetchStudentData = async (e) => {
    if (e) e.preventDefault();
    if (!studentId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/attendance/stats/${studentId}`);
      const data = await response.json();
      
      if (data.stats) {
        setStats(data.stats);
        setActiveStudent(studentId);
      } else {
        setError("Student record not found.");
        setStats(null);
      }
    } catch (err) {
      setError("Failed to connect to server.");
      console.error("Admin Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- API FETCH: Daily Detail ---
  const handleDateClick = async (day) => {
    if (!activeStudent) return;

    const formattedDateForDB = `${day}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
    const displayDate = `${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    try {
      const response = await fetch(`http://localhost:5000/attendance/detail/${activeStudent}/${formattedDateForDB}`);
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

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const currentStats = stats || {
    attendanceSummary: { totalSlots: 0, presentSlots: 0, absentSlots: 0, percentage: 0 },
    absentDays: { partialAbsent: 0, fullAbsent: 0, totalAbsentSlots: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Admin Search Header --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <User className="text-indigo-600" /> Administrative Attendance Portal
          </h1>
          <form onSubmit={fetchStudentData} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input 
                type="text"
                placeholder="Enter Student ID (e.g., 24081)"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Searching..." : "Fetch Records"}
            </button>
          </form>
          {error && (
            <div className="mt-3 flex items-center gap-2 text-red-600 text-sm font-medium">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>

        {activeStudent && (
          <>
            {/* --- Stats Sections --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-700 mb-4">Performance Overview: {activeStudent}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Total Slots" value={currentStats.attendanceSummary.totalSlots} />
                  <StatCard label="Present Slots" value={currentStats.attendanceSummary.presentSlots} />
                  <StatCard label="Absent Slots" value={currentStats.attendanceSummary.absentSlots} />
                  <StatCard label="Attendance %" value={`${currentStats.attendanceSummary.percentage}%`} highlight />
                </div>
              </section>

              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-red-600 mb-4">Absence Analytics</h2>
                <div className="grid grid-cols-3 gap-3">
                  <StatCard label="Partial" value={currentStats.absentDays.partialAbsent} />
                  <StatCard label="Full" value={currentStats.absentDays.fullAbsent} />
                  <StatCard label="Total Lost" value={currentStats.absentDays.totalAbsentSlots} />
                </div>
              </section>
            </div>

            {/* --- Month View --- */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <CalendarIcon className="text-indigo-500" /> Monthly Log
                </h2>
                <div className="bg-slate-100 px-4 py-2 rounded-lg font-semibold text-slate-600">
                   {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>
                ))}
                
                {[...Array(firstDayOfMonth)].map((_, i) => <div key={i} />)}
                {[...Array(daysInMonth(selectedDate))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDateClick(i + 1)}
                    className="h-12 flex items-center justify-center rounded-lg border border-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-slate-700 font-medium"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {viewDetail && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg"
                  >
                    <h3 className="font-bold text-indigo-900">Log for {viewDetail.date}</h3>
                    <div className="flex gap-6 mt-1">
                      <p className="text-indigo-800">Status: <span className="font-bold underline">{viewDetail.status}</span></p>
                      <p className="text-indigo-700">Slots: {viewDetail.slots}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
};

const StatCard = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-lg border transition-all ${highlight ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-50 border-slate-200'}`}>
    <p className={`text-[10px] uppercase font-bold tracking-widest ${highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminAttendanceS;