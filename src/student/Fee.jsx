import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeeManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('pay');
  const [feeType, setFeeType] = useState('academic');
  const [loading, setLoading] = useState(true);
  
  // Dynamic data states
  const [stats, setStats] = useState({ total: 0, paid: 0, balance: 0, outstanding: 0 });
  const [academicFees, setAcademicFees] = useState([]);
  const [hostelFees, setHostelFees] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [applications, setApplications] = useState([]);

  const studentCode = "24081"; // B.Tech Cybersecurity student

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        setLoading(true);
        // Fetch Summary and Fee Lists
        const summaryRes = await axios.get(`http://localhost:5000/fees/summary/${studentCode}`);
        if (summaryRes.data) {
          setStats(summaryRes.data.stats);
          setAcademicFees(summaryRes.data.academicFees);
          setHostelFees(summaryRes.data.hostelFees);
          setApplications(summaryRes.data.applications || []);
        }

        // Fetch Transaction History
        const historyRes = await axios.get(`http://localhost:5000/fees/history/${studentCode}`);
        setHistoryData(historyRes.data);
      } catch (error) {
        console.error("Error loading fee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeDetails();
  }, [studentCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER COMPONENT */}
      <Header />

      {/* MAIN CONTENT WRAPPER */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex-grow p-8"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Animated Color-Changing Banner */}
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
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
          </motion.div>

          {/* Navigation Tabs */}
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
            {activeTab === 'pay' && (
              <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <SummaryStat label="Total Fee" value={stats.total} />
                  <SummaryStat label="Paid" value={stats.paid} />
                  <SummaryStat label="To Pay" value={stats.balance} />
                  <SummaryStat label="Outstanding" value={stats.outstanding} isRed />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FeeBox 
                    title="Academic Fee Details" 
                    data={academicFees} 
                    active={feeType === 'academic'} 
                    onSelect={() => setFeeType('academic')} 
                  />
                  <FeeBox 
                    title="Hostel Fee Details" 
                    data={hostelFees} 
                    active={feeType === 'hostel'} 
                    onSelect={() => setFeeType('hostel')} 
                  />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                   <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-colors">
                     Proceed to Payment
                   </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
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
                    {historyData.length > 0 ? historyData.map((h, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-6 font-mono font-bold text-indigo-600">{h.id}</td>
                        <td className="text-sm">{h.date}</td>
                        <td className="text-sm font-bold">{h.type} <span className="block text-[10px] text-gray-400 font-normal">{h.year}</span></td>
                        <td className="text-center font-bold">₹{h.amount.toLocaleString()}</td>
                        <td className="text-right p-6">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
                            {h.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="p-10 text-center text-gray-400">No payment records found</td></tr>
                    )}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map((app, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-gray-800">{app.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase">{app.date} • {app.size}</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-md">
                      Download
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* FOOTER COMPONENT */}
      <Footer />
    </div>
  );
};

// Sub-components
const SummaryStat = ({ label, value, isRed }) => (
  <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-3xl border shadow-sm ${isRed ? 'bg-red-50 border-red-100 text-red-700' : 'bg-white border-gray-100 text-gray-800'}`}>
    <p className="text-[10px] uppercase font-black opacity-50 mb-1">{label}</p>
    <p className="text-2xl font-black">₹{value?.toLocaleString() || 0}</p>
  </motion.div>
);

const FeeBox = ({ title, data, active, onSelect }) => (
  <motion.div onClick={onSelect} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${active ? 'border-indigo-500 bg-white shadow-xl' : 'bg-gray-50 border-transparent'}`}>
    <h3 className={`font-black uppercase text-xs mb-4 ${active ? 'text-indigo-600' : 'text-gray-400'}`}>{title}</h3>
    <div className="space-y-3">
      {data?.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
          <span className="font-bold text-gray-600">{item.year}</span>
          <span className="font-black">₹{item.total.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default FeeManagementSystem;