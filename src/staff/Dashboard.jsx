import React, { useState, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { 

  Users, CalendarCheck, Briefcase, ShieldCheck, 

  Clock, MessageCircle, Bell, Megaphone, BookOpen,

  Mail, Smartphone, Globe, PhoneCall, X, ArrowRight, CheckCircle2

} from 'lucide-react';



const StaffDashboard = () => {

  const [activeTab, setActiveTab] = useState('Notifications');

  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const tabs = ['Notifications', 'Department Announcement', 'LMS Notifications'];



  // --- Dynamic Attendance Log Generation ---

  const logs = useMemo(() => {

    const today = new Date(); // Feb 8, 2026

    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    const data = [];



    // Generate logs from Feb 1st to Today (Feb 8th)

    for (let i = today.getDate(); i >= 1; i--) {

      const date = new Date(currentYear, currentMonth, i);

      const isSunday = date.getDay() === 0;

      

      data.push({

        date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),

        dayName: date.toLocaleDateString('en-IN', { weekday: 'long' }),

        in: isSunday ? "---" : "09:15 AM",

        out: isSunday ? "---" : "06:30 PM",

        status: isSunday ? "Holiday" : "Present",

        isSunday

      });

    }

    return data;

  }, []);



  const staffData = {

    name: "Narendra",

    empId: "GB-FOUNDER-001",

    role: "Founder & Director",

    officialMail: "narendra@grambasket.com",

    personalMail: "narendra.personal@gmail.com",

    phone: "+91 98765 43210",

    altPhone: "+91 88888 77777",

    status: "On Duty"

  };



  const containerVariants = {

    hidden: { opacity: 0 },

    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }

  };



  const cardVariants = {

    hidden: { opacity: 0, y: 30 },

    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } }

  };



  return (

    <motion.main 

      initial="hidden" animate="visible" variants={containerVariants}

      className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 font-sans text-slate-800"

    >

      <div className="max-w-7xl mx-auto w-full">

        

        {/* Title Bar */}

        <motion.div variants={cardVariants} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="p-3 bg-white rounded-2xl shadow-lg border border-slate-100">

               <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">GB</div>

            </div>

            <div>

              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Staff Console</h1>

              <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-[0.2em]">Grambasket Systems v2.0</p>

            </div>

          </div>

          <div className="bg-white/60 backdrop-blur-md p-3 px-6 rounded-2xl shadow-sm border border-white flex items-center gap-3">

            <Clock className="text-indigo-500 animate-pulse" size={18} />

            <p className="text-xs font-black text-slate-700 uppercase tracking-widest">Shift Status: 09:30 AM Entry</p>

          </div>

        </motion.div>



        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          

          {/* Profile Section */}

          <motion.div variants={cardVariants} className="lg:col-span-4">

            <div className="bg-white border border-slate-50 rounded-[3rem] shadow-2xl shadow-indigo-900/5 p-8 sticky top-10">

              <div className="relative w-40 h-40 mx-auto mb-6">

                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}

                  className="absolute inset-0 border-[3px] border-dashed border-indigo-200 rounded-[3.5rem]" />

                <div className="absolute inset-3 bg-slate-50 rounded-[2.8rem] overflow-hidden border-4 border-white shadow-inner flex items-center justify-center text-indigo-200">

                   <Users size={56} />

                </div>

              </div>

              <div className="text-center mb-8">

                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{staffData.name}</h2>

                <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em]">{staffData.role}</p>

              </div>

              <div className="space-y-4 border-t border-slate-50 pt-8">

                <ProfileDetailItem icon={<Mail size={16}/>} label="Official Mail" value={staffData.officialMail} />

                <ProfileDetailItem icon={<Globe size={16}/>} label="Personal Mail" value={staffData.personalMail} />

                <ProfileDetailItem icon={<Smartphone size={16}/>} label="Primary Phone" value={staffData.phone} />

                <ProfileDetailItem icon={<PhoneCall size={16}/>} label="Alt. Contact" value={staffData.altPhone} />

              </div>

            </div>

          </motion.div>



          {/* Feed Section */}

          <div className="lg:col-span-8 space-y-6">

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-900/5 flex items-center justify-between">

              <div className="flex items-center gap-5">

                 <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl"><CalendarCheck size={28}/></div>

                 <div>

                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Attendance Efficiency</p>

                   <p className="text-3xl font-black text-slate-800 tracking-tighter">98.4%</p>

                 </div>

              </div>

              <button onClick={() => setIsLogsOpen(true)} className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full hover:bg-indigo-600 transition-all shadow-lg active:scale-95">

                View Logs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>

              </button>

            </motion.div>



            <motion.div variants={cardVariants} className="bg-white border border-slate-50 rounded-[3rem] shadow-2xl shadow-indigo-900/5 min-h-[500px] flex flex-col p-8">

              <div className="flex items-center gap-3 text-indigo-600 mb-8 font-black uppercase text-sm tracking-widest"><MessageCircle size={24} /> Communication Feed</div>

              <div className="flex bg-slate-100/80 p-2 rounded-[1.5rem] mb-8 border border-slate-200">

                {tabs.map((tab) => (

                  <button key={tab} onClick={() => setActiveTab(tab)} className={`relative flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>

                    <span className="relative z-10">{tab}</span>

                    {activeTab === tab && <motion.div layoutId="activePill" className="absolute inset-0 bg-white shadow-sm rounded-xl" transition={{ type: "spring", duration: 0.6 }} />}

                  </button>

                ))}

              </div>

              <div className="flex-grow bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100 flex items-center justify-center p-12 text-center">

                <div className="text-4xl mb-4 opacity-20">🗂️</div>

                <p className="text-xs font-bold text-slate-400 italic font-sans tracking-wide">No recent updates in {activeTab}.</p>

              </div>

            </motion.div>

          </div>

        </div>

      </div>



      {/* --- ATTENDANCE LOGS MODAL --- */}

      <AnimatePresence>

        {isLogsOpen && (

          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLogsOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

            <motion.div initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white max-h-[90vh] flex flex-col">

              <div className="p-8 border-b border-slate-50">

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100"><CalendarCheck size={20}/></div>

                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-tighter">Shift History</h2>

                  </div>

                  <button onClick={() => setIsLogsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X size={24} /></button>

                </div>

              </div>

              <div className="p-8 overflow-y-auto space-y-3">

                {logs.map((log, i) => (

                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${log.isSunday ? 'bg-red-50/30 border-red-100' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'}`}>

                    <div className="flex items-center gap-4">

                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] ${log.isSunday ? 'bg-red-100 text-red-500' : 'bg-white text-slate-400 border border-slate-100'}`}>{logs.length - i}</div>

                      <div>

                        <p className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-tighter">{log.date}</p>

                        <p className={`text-[10px] font-bold uppercase tracking-widest ${log.isSunday ? 'text-red-400' : 'text-indigo-500'}`}>{log.dayName}</p>

                      </div>

                    </div>

                    <div className="flex gap-6 text-right items-center">

                      <div className="flex flex-col">

                        <span className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Entry</span>

                        <span className="text-xs font-black text-slate-700 font-mono">{log.in}</span>

                      </div>

                      <div className="flex flex-col">

                        <span className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Exit</span>

                        <span className="text-xs font-black text-slate-700 font-mono">{log.out}</span>

                      </div>

                      <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${log.isSunday ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{log.status}</div>

                    </div>

                  </motion.div>

                ))}

              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex gap-4">

                <button onClick={() => setIsLogsOpen(false)} className="flex-1 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 active:scale-95">Close Portal</button>

              </div>

            </motion.div>

          </div>

        )}

      </AnimatePresence>

    </motion.main>

  );

};



const ProfileDetailItem = ({ icon, label, value }) => (

  <div className="flex items-center gap-4 p-1 group">

    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shadow-sm border border-transparent group-hover:border-indigo-50">{icon}</div>

    <div className="overflow-hidden">

      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{label}</p>

      <p className="text-xs font-black text-slate-700 truncate">{value}</p>

    </div>

  </div>

);



export default StaffDashboard;