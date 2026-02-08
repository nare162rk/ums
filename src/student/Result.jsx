import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SemesterResults = () => {
  const [selectedSem, setSelectedSem] = useState(1);
  const studentCode = "24081";

  const semesterData = {
    1: { session: "Winter (Odd)", sgpa: 8.12, cgpa: 8.12, status: "PASS", subjects: [{ code: "20CS101", name: "Programming in C", credits: 4, grade: "A", marks: 82 }, { code: "20MA101", name: "Engineering Mathematics-I", credits: 4, grade: "B+", marks: 75 }, { code: "20CY101", name: "Cyber Security Fundamentals", credits: 3, grade: "O", marks: 91 }] },
    2: { session: "Summer (Even)", sgpa: 7.85, cgpa: 7.98, status: "PASS", subjects: [{ code: "20CS202", name: "Object Oriented Programming", credits: 4, grade: "A", marks: 78 }, { code: "20EE102", name: "Basic Electronics", credits: 3, grade: "B", marks: 68 }, { code: "20HS101", name: "Communication Skills", credits: 2, grade: "A+", marks: 88 }] },
    3: { session: "Winter (Odd)", sgpa: 8.40, cgpa: 8.12, status: "PASS", subjects: [{ code: "21CS301", name: "Data Structures & Algorithms", credits: 4, grade: "A", marks: 84 }, { code: "21CS305", name: "Computer Organization", credits: 3, grade: "A", marks: 80 }, { code: "21CY302", name: "Network Security", credits: 4, grade: "O", marks: 95 }] },
    4: { session: "Summer (Even)", sgpa: 8.65, cgpa: 8.25, status: "PASS", subjects: [{ code: "21CS401", name: "Operating Systems", credits: 4, grade: "A+", marks: 89 }, { code: "21CY404", name: "Cryptography", credits: 4, grade: "A", marks: 81 }, { code: "21MA401", name: "Discrete Mathematics", credits: 3, grade: "B+", marks: 77 }] },
    5: { session: "Winter (Odd)", sgpa: 8.90, cgpa: 8.38, status: "PASS", subjects: [{ code: "22CY501", name: "Ethical Hacking", credits: 4, grade: "O", marks: 96 }, { code: "22CS502", name: "Database Management Systems", credits: 4, grade: "A", marks: 83 }, { code: "22CS505", name: "Theory of Computation", credits: 3, grade: "A", marks: 80 }] },
    6: { session: "Summer (Even)", sgpa: 8.20, cgpa: 8.35, status: "PASS", subjects: [{ code: "22CY602", name: "Digital Forensics", credits: 4, grade: "A", marks: 82 }, { code: "22CS603", name: "Software Engineering", credits: 3, grade: "B+", marks: 74 }, { code: "22CY605", name: "Cloud Security", credits: 4, grade: "A+", marks: 88 }] },
    7: { session: "Winter (Odd)", sgpa: 9.10, cgpa: 8.46, status: "PASS", subjects: [{ code: "23CY701", name: "Malware Analysis", credits: 4, grade: "O", marks: 94 }, { code: "23CY702", name: "Penetration Testing", credits: 4, grade: "A+", marks: 89 }, { code: "23CS705", name: "Project Phase-I", credits: 6, grade: "O", marks: 98 }] },
    8: { session: "Summer (Even)", sgpa: 9.50, cgpa: 8.59, status: "PASS", subjects: [{ code: "23CY801", name: "Information Security Audit", credits: 3, grade: "A+", marks: 90 }, { code: "23CY802", name: "Cyber Laws & Ethics", credits: 3, grade: "O", marks: 92 }, { code: "23CS805", name: "Major Project / Internship", credits: 12, grade: "O", marks: 97 }] }
  };

  const current = semesterData[selectedSem];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Animated Color-Changing Header */}
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
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="text-right cursor-default"
            >
              <p className="text-xs uppercase text-indigo-300">Student Code</p>
              <p className="text-xl font-mono font-bold tracking-widest">{studentCode}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Controls with Pop-up effect */}
        <div className="p-6 border-b bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 bg-gray-50 p-2 rounded-xl border border-gray-100"
          >
            <span className="text-sm font-semibold text-gray-500 ml-2">Select Semester:</span>
            <select 
              className="bg-transparent border-none rounded-lg px-4 py-2 font-bold text-indigo-700 outline-none cursor-pointer"
              value={selectedSem}
              onChange={(e) => setSelectedSem(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
          </motion.div>
          
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
        </div>

        {/* Table Section with List Animation */}
        <div className="p-6 overflow-hidden">
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
                    whileHover={{ scale: 1.01, backgroundColor: "#f8fafc" }}
                    whileTap={{ scale: 0.98 }}
                    className="border-b border-gray-50 cursor-pointer"
                  >
                    <td className="py-4 font-mono text-sm text-indigo-600 font-bold">{sub.code}</td>
                    <td className="py-4 text-gray-800 font-medium">{sub.name}</td>
                    <td className="py-4 text-center text-gray-600">{sub.credits}</td>
                    <td className="py-4 text-center text-gray-600 font-semibold">{sub.marks}</td>
                    <td className="py-4 text-center">
                      <motion.span 
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        className={`px-3 py-1 rounded-md text-xs font-bold inline-block ${sub.grade === 'O' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}
                      >
                        {sub.grade}
                      </motion.span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>

        {/* Footer Summary with Scaling Stats */}
        <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-xs italic">
            * Generated for Cybersecurity Student - Parul University
          </div>
          <div className="flex space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
              <span className="text-xs text-gray-400 font-bold">SGPA</span>
              <motion.span key={current.sgpa} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-2xl font-black text-gray-800">{current.sgpa}</motion.span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center border-l pl-6">
              <span className="text-xs text-gray-400 font-bold">CGPA</span>
              <span className="text-2xl font-black text-indigo-600">{current.cgpa}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SemesterResults;