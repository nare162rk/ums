import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SemesterResults = () => {
  const [selectedSem, setSelectedSem] = useState(1);
  const [semesterData, setSemesterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentCode = "24081";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/results/${studentCode}`);
        const data = await response.json();
        setSemesterData(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [studentCode]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Academic Records...</div>;
  if (!semesterData) return <div className="min-h-screen flex items-center justify-center">No records found.</div>;

  const current = semesterData[selectedSem];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            
            {/* Animated Header Section */}
            <motion.div 
              animate={{ backgroundColor: ["#312e81", "#1e293b", "#134e4a", "#312e81"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-white p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">University Student Portal</h1>
                  <p className="text-indigo-200 text-sm">Academic Year 2025-26</p>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} className="text-right cursor-default">
                  <p className="text-xs uppercase text-indigo-300">Student Code</p>
                  <p className="text-xl font-mono font-bold tracking-widest">{studentCode}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="p-6 border-b bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                <span className="text-sm font-semibold text-gray-500 ml-2">Select Semester:</span>
                <select 
                  className="bg-transparent border-none rounded-lg px-4 py-2 font-bold text-indigo-700 outline-none cursor-pointer"
                  value={selectedSem}
                  onChange={(e) => setSelectedSem(Number(e.target.value))}
                >
                  {Object.keys(semesterData).map(n => (
                    <option key={n} value={n}>Sem {n}</option>
                  ))}
                </select>
              </motion.div>
              
              {current && (
                <div className="flex space-x-4">
                  <motion.div whileHover={{ y: -5 }} className="text-center px-4 py-2 bg-indigo-50 rounded-lg">
                    <p className="text-[10px] text-indigo-500 font-bold uppercase">Session</p>
                    <p className="text-sm font-bold text-indigo-900">{current.session}</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="text-center px-4 py-2 bg-green-50 rounded-lg">
                    <p className="text-[10px] text-green-600 font-bold uppercase">Status</p>
                    <p className="text-sm font-bold text-green-700">{current.status}</p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Table Section */}
            <div className="p-6 overflow-hidden">
              {current ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100 text-xs uppercase text-gray-400 font-bold">
                      <th className="py-4">Sub Code</th>
                      <th className="py-4">Subject Name</th>
                      <th className="py-4 text-center">Credits</th>
                      <th className="py-4 text-center">Marks</th>
                      <th className="py-4 text-center">Grade</th>
                    </tr>
                  </thead>
                  <motion.tbody layout>
                    <AnimatePresence mode="wait">
                      {current.subjects.map((sub, idx) => (
                        <motion.tr 
                          key={`${selectedSem}-${sub.code}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-b border-gray-50"
                        >
                          <td className="py-4 font-mono text-sm text-indigo-600 font-bold">{sub.code}</td>
                          <td className="py-4 text-gray-800 font-medium">{sub.name}</td>
                          <td className="py-4 text-center text-gray-600">{sub.credits}</td>
                          <td className="py-4 text-center text-gray-600 font-semibold">{sub.marks}</td>
                          <td className="py-4 text-center">
                            <span className={`px-3 py-1 rounded-md text-xs font-bold inline-block ${sub.grade === 'O' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                              {sub.grade}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </motion.tbody>
                </table>
              ) : (
                <div className="text-center py-10 text-gray-500">No data available for this semester.</div>
              )}
            </div>

            {/* Footer Summary Section */}
            {current && (
              <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-xs italic">* Official Record - Parul University</div>
                <div className="flex space-x-6">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 font-bold">SGPA</span>
                    <span className="text-2xl font-black text-gray-800">{current.sgpa}</span>
                  </div>
                  <div className="flex flex-col items-center border-l pl-6">
                    <span className="text-xs text-gray-400 font-bold">CGPA</span>
                    <span className="text-2xl font-black text-indigo-600">{current.cgpa}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SemesterResults;