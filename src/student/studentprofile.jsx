import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('PERSONAL');
  const [modalType, setModalType] = useState(null); // 'photo' or 'call'

  const studentData = {
    name: "Aarav Mehta",
    enrollment: "STU2025CS01",
    course: "BTech - Computer Science (Semester - 6)",
    degreePath: "BTech - Computer Science (Semester - 6)",
    gender: "Male",
    religion: "Hinduism",
    nationality: "Indian",
    bloodGroup: "O+",
    category: "General",
    aadhar: "xxxx-xxxx-4821",
    motherTongue: "Gujarati",
    domicile: "Gujarat",
    phone: "9012345678",
    father: "Suresh Mehta",
    fatherPhone: "9898765432",
    mother: "Anita Mehta",
    motherPhone: "9123987654"
  };

  const tabs = ['PERSONAL', 'ADMISSION', 'CONTACT', 'PARENTS', 'EDUCATION QUALIFICATION'];

  // Springy animations for that "premium" feel
  const fastSpring = { type: "spring", stiffness: 400, damping: 30 };

  const InfoBlock = ({ label, value }) => (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      className="flex flex-col gap-1"
    >
      <span className="text-[10px] font-bold text-[#007bff] uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-slate-800">{value}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden font-sans bg-[#f0f4f8]">
      {/* Animated Mesh Background - Matches the photo's soft vibes */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }} 
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header - Matches "StudentPortal" logo style */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
             <h1 className="text-3xl font-black text-[#1a3a5a] tracking-tighter italic">
               Student<span className="text-[#007bff]">Portal</span>
             </h1>
             <div className="h-1.5 w-14 bg-[#007bff] rounded-full mt-1" />
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-black text-slate-500">{studentData.enrollment}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Profile Card */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/10 border border-white text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={() => setModalType('photo')}
              className="relative w-40 h-40 mx-auto mb-6 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-blue-500 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <img 
                src="/photo.jpeg" 
                alt="Aarav" 
                className="relative w-full h-full object-cover rounded-[2rem] border-4 border-white shadow-lg" 
              />
            </motion.div>

            <h2 className="text-xl font-black text-slate-800">{studentData.name}</h2>
            <p className="text-[10px] font-bold text-[#007bff] uppercase tracking-widest mt-1">Undergraduate Student</p>

            <div className="mt-8 bg-blue-50/50 rounded-2xl p-4 text-left border border-blue-100/50">
              <span className="text-[9px] font-black text-[#007bff] uppercase tracking-tighter">Degree Path</span>
              <p className="text-[11px] font-bold text-slate-700 leading-tight mt-1">{studentData.degreePath}</p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <motion.button 
                whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }}
                onClick={() => setModalType('photo')}
                className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center"
              >
                🖼️
              </motion.button>
              <motion.button 
                whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }}
                onClick={() => setModalType('call')}
                className="w-12 h-12 bg-[#ecfdf5] rounded-2xl shadow-md border border-green-100 flex items-center justify-center"
              >
                📞
              </motion.button>
            </div>
          </motion.aside>

          {/* Right Side: Tabbed Information */}
          <motion.main 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white overflow-hidden"
          >
            <div className="flex bg-slate-50/50 p-2 gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
                    activeTab === tab ? 'bg-white text-[#007bff] shadow-md' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-10 min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden" animate="visible" exit="hidden"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12"
                >
                  {activeTab === 'PERSONAL' && (
                    <>
                      <InfoBlock label="Gender" value={studentData.gender} />
                      <InfoBlock label="Religion" value={studentData.religion} />
                      <InfoBlock label="Nationality" value={studentData.nationality} />
                      <InfoBlock label="Blood Group" value={studentData.bloodGroup} />
                      <InfoBlock label="Category" value={studentData.category} />
                      <InfoBlock label="Aadhar" value={studentData.aadhar} />
                      <InfoBlock label="Mother Tongue" value={studentData.motherTongue} />
                      <InfoBlock label="Domicile" value={studentData.domicile} />
                    </>
                  )}
                  {/* Additional Tabs (Admission, Contact, etc.) follow the same pattern */}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Status: Active</span>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#0a192f" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1a3a5a] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl"
              >
                Confirm Details
              </motion.button>
            </div>
          </motion.main>

        </div>
      </div>

      {/* Interactive Modals */}
      <AnimatePresence>
        {modalType && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setModalType(null)}
          >
            {modalType === 'photo' && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-2 rounded-[3rem] shadow-2xl max-w-sm w-full"
                onClick={e => e.stopPropagation()}
              >
                <img src="/photo.jpeg" className="w-full rounded-[2.5rem]" alt="Zoom View" />
              </motion.div>
            )}
            {modalType === 'call' && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-[3rem] shadow-2xl max-w-md w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-green-600 p-8 text-white">
                  <h3 className="text-2xl font-black uppercase tracking-widest">Contact Center</h3>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    { label: 'Student', name: studentData.name, phone: studentData.phone },
                    { label: 'Father', name: studentData.father, phone: studentData.fatherPhone },
                    { label: 'Mother', name: studentData.mother, phone: studentData.motherPhone },
                  ].map((contact, i) => (
                    <a key={i} href={`tel:${contact.phone}`} className="flex justify-between items-center p-5 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-[9px] font-black text-green-500 uppercase">{contact.label}</p>
                        <p className="font-bold text-slate-800">{contact.name}</p>
                      </div>
                      <span className="font-black text-slate-400">{contact.phone}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentProfile;