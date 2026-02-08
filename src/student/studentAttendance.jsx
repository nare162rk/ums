import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDetail, setViewDetail] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Using your Firestore Document ID
  const studentCode = "24081"; 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/attendance/stats/${studentCode}`);
        const data = await response.json();
        
        if (data && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [studentCode]);

  const handleDateClick = async (day) => {
    const formattedDate = `${day}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
    try {
      const response = await fetch(`http://localhost:5000/attendance/detail/${studentCode}/${formattedDate}`);
      const data = await response.json();
      
      setViewDetail({
        date: `${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`,
        status: data.status || "No Record",
        slots: data.slots || "N/A"
      });
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-indigo-600 font-bold animate-bounce">Loading Attendance...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const summary = stats?.attendanceSummary || { totalSlots: 0, presentSlots: 0, absentSlots: 0, percentage: 0 };
  const absent = stats?.absentDays || { partialAbsent: 0, fullAbsent: 0, totalAbsentSlots: 0 };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Summary Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-indigo-900">Attendance Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Total Slots" value={summary.totalSlots} />
                <StatCard label="Present Slots" value={summary.presentSlots} />
                <StatCard label="Absent Slots" value={summary.absentSlots} />
                <StatCard label="Present %" value={`${summary.percentage}%`} highlight />
              </div>
            </section>

            {/* Absent Days Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-red-700 mb-4">Absent Days</h2>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Partial" value={absent.partialAbsent} />
                <StatCard label="Full" value={absent.fullAbsent} />
                <StatCard label="Total Slots" value={absent.totalAbsentSlots} />
              </div>
            </section>
          </div>

          {/* Month View Section */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Month View</h2>
              <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-700">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
              ))}
              
              {[...Array(firstDayOfMonth)].map((_, i) => <div key={i} />)}
              {[...Array(daysInMonth(selectedDate))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDateClick(i + 1)}
                  className="h-12 flex items-center justify-center rounded-lg border border-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-gray-700 font-medium"
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {viewDetail && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-blue-900">Details for {viewDetail.date}</h3>
                      <p className="text-blue-800">Status: {viewDetail.status}</p>
                      <p className="text-blue-700 text-sm">Slots: {viewDetail.slots}</p>
                    </div>
                    <button 
                      onClick={() => setViewDetail(null)}
                      className="text-blue-400 hover:text-blue-600 font-bold"
                    >
                      ✕
                    </button>
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

const StatCard = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-lg border transition-transform hover:scale-[1.02] ${highlight ? 'bg-indigo-600 text-white shadow-md border-indigo-700' : 'bg-gray-50 border-gray-200 shadow-sm'}`}>
    <p className={`text-[10px] uppercase font-bold tracking-wider ${highlight ? 'text-indigo-100' : 'text-gray-400'}`}>{label}</p>
    <p className="text-2xl font-black">{value}</p>
  </div>
);

export default StudentAttendance;