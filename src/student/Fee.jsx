import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeeManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('pay');
  const [feeType, setFeeType] = useState('academic');
  const studentCode = "24081"; // B.Tech Cybersecurity student

  // --- DATA STRUCTURES ---
  const stats = { total: 450000, paid: 320000, balance: 130000, outstanding: 130000 };

  const academicFees = [
    { year: "1st Year", total: 100000, paid: 100000, status: "Cleared" },
    { year: "2nd Year", total: 110000, paid: 110000, status: "Cleared" },
    { year: "3rd Year", total: 120000, paid: 100000, status: "Pending" },
    { year: "4th Year", total: 120000, paid: 0, status: "Due" },
  ];

  const hostelFees = [
    { year: "Year 1", total: 80000, paid: 80000 },
    { year: "Year 2", total: 85000, paid: 85000 }, // +5000 increase
    { year: "Year 3", total: 90000, paid: 45000 }, // +5000 increase
  ];

  const historyData = [
    { id: "REC-771", date: "2025-08-15", type: "Academic", amount: 100000, status: "Success", year: "1st Year" },
    { id: "REC-882", date: "2025-10-10", type: "Hostel", amount: 80000, status: "Success", year: "Year 1" },
    { id: "REC-993", date: "2026-01-05", type: "Academic", amount: 110000, status: "Success", year: "2nd Year" },
  ];

  const applications = [
    { name: "Academic Fee Receipt - Sem 3", date: "Jan 2026", size: "1.2 MB" },
    { name: "Hostel Mess Advance", date: "Dec 2025", size: "450 KB" },
    { name: "Scholarship Application", date: "Nov 2025", size: "2.1 MB" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Animated Color-Changing Header */}
        <motion.div 
          animate={{ backgroundColor: ["#312e81", "#1e293b", "#134e4a", "#312e81"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Fee Management</h1>
              <p className="text-indigo-100 opacity-80">Student ID: {studentCode}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Status</p>
              <p className="text-xl font-bold">Active Enrollment</p>
            </div>
          </div>
          {/* Decorative Circle Animation */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl"
          />
        </motion.div>

        {/* Navigation Tabs with Hover Pop and Click Animation */}
        <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {['pay', 'history', 'applications'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400'
              }`}
            >
              {tab === 'pay' ? 'Pay Fee' : tab === 'history' ? 'Fee History' : 'Fee Applications'}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* PAY FEE TAB */}
          {activeTab === 'pay' && (
            <motion.div 
              key="pay" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SummaryStat label="Total Collected" value={stats.total} />
                <SummaryStat label="Paid" value={stats.paid} />
                <SummaryStat label="To Pay" value={stats.balance} />
                <SummaryStat label="Outstanding" value={stats.outstanding} isRed />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeeBox title="Academic Fee Details" data={academicFees} active={feeType === 'academic'} onSelect={() => setFeeType('academic')} />
                <FeeBox title="Hostel Fee Details" data={hostelFees} active={feeType === 'hostel'} onSelect={() => setFeeType('hostel')} />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-black text-gray-400 uppercase mb-4">Paid Receipts ({feeType})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2].map(i => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.08, borderColor: "#6366f1" }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 border-2 border-dashed border-gray-200 rounded-2xl text-center cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-bold text-gray-400">#REC-00{i}</p>
                      <p className="text-sm font-black text-indigo-600">DOWNLOAD</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                 <h3 className="text-sm font-black text-gray-400 uppercase mb-2">Challan List</h3>
                 <div className="py-10 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 text-gray-400">
                   No records found
                 </div>
              </div>
            </motion.div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <motion.div 
              key="history" 
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: -50, opacity: 0 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-[10px] uppercase font-bold text-gray-400">
                    <th className="p-6">Receipt ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-center">Amount</th>
                    <th className="text-right p-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((h, i) => (
                    <motion.tr 
                      key={i} 
                      whileHover={{ backgroundColor: "#f8fafc", scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className="border-b last:border-0 cursor-pointer"
                    >
                      <td className="p-6 font-mono font-bold text-indigo-600">{h.id}</td>
                      <td className="text-sm">{h.date}</td>
                      <td className="text-sm font-bold">{h.type} <span className="block text-[10px] text-gray-400 uppercase font-normal">{h.year}</span></td>
                      <td className="text-center font-bold">₹{h.amount.toLocaleString()}</td>
                      <td className="text-right p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">Success</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === 'applications' && (
            <motion.div 
              key="apps" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {applications.map((app, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03, y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-indigo-500 shadow-sm flex justify-between items-center cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">PDF</div>
                    <div>
                      <p className="font-bold text-gray-800">{app.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{app.date} • {app.size}</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-lg"
                  >
                    Download
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Animated Helper Components ---

const SummaryStat = ({ label, value, isRed }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.05 }}
    className={`p-6 rounded-3xl border shadow-sm transition-colors ${isRed ? 'bg-red-50 border-red-100 text-red-700' : 'bg-white border-gray-100 text-gray-800'}`}
  >
    <p className="text-[10px] uppercase font-black tracking-widest opacity-50 mb-1">{label}</p>
    <p className="text-2xl font-black">₹{value.toLocaleString()}</p>
  </motion.div>
);

const FeeBox = ({ title, data, active, onSelect }) => (
  <motion.div 
    onClick={onSelect}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${active ? 'border-indigo-500 bg-white shadow-xl' : 'bg-gray-50 border-transparent'}`}
  >
    <h3 className={`font-black uppercase text-xs tracking-tighter mb-4 ${active ? 'text-indigo-600' : 'text-gray-400'}`}>{title}</h3>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
          <span className="font-bold text-gray-600">{item.year}</span>
          <span className="font-black">₹{item.total.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default FeeManagementSystem;