import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Zap, MoreHorizontal, MapPin, 
  Users as UsersIcon, FlaskConical, BookOpen, Clock 
} from 'lucide-react';

const StaffTimetable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const timeSlots = [
    { time: "09:30 AM", end: "10:25 AM" },
    { time: "10:25 AM", end: "11:20 AM" },
    { time: "11:20 AM", end: "12:20 PM", type: "BREAK", label: "LUNCH" },
    { time: "12:20 PM", end: "01:15 PM" },
    { time: "01:15 PM", end: "02:10 PM" },
    { time: "02:10 PM", end: "02:30 PM", type: "BREAK", label: "TEA" },
    { time: "02:30 PM", end: "03:25 PM" },
    { time: "03:25 PM", end: "04:20 PM" },
  ];

  // Logic: type 0 = Class (Indigo), type 1 = Lab (Rose)
  const scheduleData = {
    "0-0": { task: "Cyber Security", room: "RM 302", batch: "6CYB1", type: 0 },
    "0-3": { task: "Malware Lab", room: "LAB 04", batch: "6CYB1", type: 1 },
    "1-1": { task: "Ethical Hacking", room: "RM 105", batch: "6CYB2", type: 0 },
    "1-4": { task: "Full Stack Lab", room: "LAB 09", batch: "STF-D", type: 1 },
    "2-3": { task: "Cloud Lab", room: "LAB 02", batch: "6CYB1", type: 1 },
    "2-6": { task: "Incident Resp", room: "RM 401", batch: "6CYB2", type: 0 },
    "3-0": { task: "Network Lab", room: "LAB 07", batch: "ADM", type: 1 },
    "4-3": { task: "AI Security", room: "RM 202", batch: "CORE", type: 0 },
    "5-1": { task: "System Lab", room: "LAB 05", batch: "MGMT", type: 1 },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] p-4 font-sans text-slate-700"
    >
      <div className="max-w-[1400px] mx-auto space-y-4">
        
        {/* Compact Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap size={20} fill="white" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight">UMS <span className="text-indigo-600 uppercase">Scheduler</span></h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500" /> Faculty Portal
              </p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Narendra Console</p>
             <p className="text-[10px] font-bold text-slate-700">Feb 2026 Session</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 px-2">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase">Class</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase">Lab</span>
           </div>
        </div>

        {/* Timetable Table */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-3 text-[9px] font-black text-slate-400 uppercase border-b border-slate-100">Time</th>
                  {days.map(day => (
                    <th key={day} className="p-3 text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 border-l border-slate-50">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, timeIdx) => (
                  <tr key={timeIdx} className="group border-b border-slate-50 last:border-0">
                    <td className="p-2 text-center bg-slate-50/30 w-24">
                      <p className="text-[10px] font-black text-indigo-600">{slot.time}</p>
                      <p className="text-[8px] font-bold text-slate-400 leading-none">{slot.end}</p>
                    </td>
                    {days.map((_, dayIdx) => {
                      if (slot.type === "BREAK") {
                        return (
                          <td key={dayIdx} className="p-1 bg-slate-50/20">
                            <div className="h-6 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                               <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">{slot.label}</span>
                            </div>
                          </td>
                        );
                      }
                      
                      const entry = scheduleData[`${dayIdx}-${timeIdx}`];
                      return (
                        <td key={dayIdx} className="p-1 min-w-[140px] border-l border-slate-50">
                          {entry ? (
                            <motion.div 
                              whileHover={{ y: -2 }}
                              className={`p-3 rounded-xl border relative transition-all
                                ${entry.type === 0 
                                  ? 'bg-indigo-50/40 border-indigo-100 border-l-[3px] border-l-indigo-500' 
                                  : 'bg-rose-50/40 border-rose-100 border-l-[3px] border-l-rose-500'}
                              `}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={entry.type === 0 ? 'text-indigo-400' : 'text-rose-400'}>
                                  {entry.type === 0 ? <BookOpen size={10}/> : <FlaskConical size={10}/>}
                                </span>
                                <MoreHorizontal size={10} className="text-slate-300" />
                              </div>
                              <p className="font-black text-slate-800 text-[10px] leading-tight uppercase mb-2">{entry.task}</p>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1 opacity-70">
                                   <UsersIcon size={8} />
                                   <span className="text-[8px] font-bold uppercase tracking-tighter">{entry.batch}</span>
                                </div>
                                <div className={`flex items-center gap-1 font-black text-[9px] ${entry.type === 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                                   <MapPin size={8} />
                                   <span className="tracking-tighter">{entry.room}</span>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="h-16 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                               <div className="w-1 h-1 bg-slate-100 rounded-full" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="flex justify-between items-center px-4 py-2 opacity-60">
           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">© UMS Faculty Hub 2026</p>
           <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">
             Powered by <span className="text-green-600">GRAMBASKET</span>
           </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StaffTimetable;