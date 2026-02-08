import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentTimetable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    { time: "09:30 AM to 10:25 AM" },
    { time: "10:25 AM to 11:20 AM" },
    { time: "11:20 AM to 12:20 PM", type: "BREAK" },
    { time: "12:20 PM to 01:15 PM" },
    { time: "01:15 PM to 02:10 PM" },
    { time: "02:10 PM to 02:30 PM", type: "BREAK" },
    { time: "02:30 PM to 03:25 PM" },
    { time: "03:25 PM to 04:20 PM" },
  ];

  // Sample data mapped to days and time indices
  const scheduleData = {
    "0-0": { code: "303105365", faculty: "(Mr. AJAY SINGH)" },
    "0-3": { code: "303105385", faculty: "(Mr. ANJALI LAKHARA)" },
    "1-3": { code: "303105386", faculty: "(Mr. ANJALI LAKHARA)" },
    "2-3": { code: "PALO ALTO COURSE", faculty: "(DRR)" },
    "3-0": { code: "303105300", faculty: "(Mr. KEVAL JAYESHBHAI MEHTA)" },
    "4-0": { code: "303105395", faculty: "(Mr. HEENA KARBHARI)" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      <Header />

      <main className="flex-grow p-4 md:p-8">
        {/* Header Info */}
        <div className="max-w-7xl mx-auto bg-white border-b p-4 flex justify-between items-center mb-4 shadow-sm rounded-t-lg">
          <h1 className="text-gray-500 text-lg font-light">
            Student Timetable <span className="text-[10px] uppercase font-bold text-blue-600 ml-2">Lohitha Shre</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto bg-white border border-gray-300 shadow-sm rounded-sm p-6 overflow-x-auto">
          {/* Timetable Branding */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">P</div>
              <div className="leading-tight">
                <p className="text-red-600 font-black text-lg tracking-tight">Parul University</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Vadodara, Gujarat</p>
              </div>
            </div>
            <div className="text-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-tight">Parul Institute of Engineering & Technology</h2>
              <p className="text-[11px] text-gray-500 font-medium">(First Shift)</p>
            </div>
            <div className="text-right leading-tight text-[11px]">
              <p className="font-black text-gray-800 uppercase">Academic Schedule</p>
              <p className="text-blue-600 font-bold">PIET-BTech-CSE-6CYBER1</p>
              <p className="text-gray-400">w.e.f 07-02-2026</p>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center text-[11px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 w-32 font-bold uppercase text-gray-600">Time Slot</th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-300 p-3 min-w-[120px]">
                      <p className="font-black text-gray-700 uppercase tracking-wider">{day}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, timeIdx) => (
                  <tr key={timeIdx} className={slot.type === "BREAK" ? "bg-gray-50/80 h-10" : "h-20"}>
                    <td className="border border-gray-300 font-bold p-2 bg-gray-50 text-gray-700">
                      {slot.time}
                    </td>
                    
                    {days.map((_, dayIdx) => {
                      if (slot.type === "BREAK") {
                        return (
                          <td key={dayIdx} className="border border-gray-300 text-gray-300 italic font-medium tracking-[0.2em] uppercase text-[9px]">
                            Break
                          </td>
                        );
                      }
                      
                      const entry = scheduleData[`${dayIdx}-${timeIdx}`];
                      return (
                        <td key={dayIdx} className="border border-gray-300 p-2 align-middle transition-colors hover:bg-blue-50/30">
                          {entry ? (
                            <div className="space-y-1">
                              <p className="font-black text-blue-900 leading-none">{entry.code}</p>
                              <div className="h-[1px] w-4 bg-blue-200 mx-auto my-1"></div>
                              <p className="text-gray-500 italic text-[10px] leading-tight">{entry.faculty}</p>
                            </div>
                          ) : (
                            <span className="text-gray-200">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend / Subject Codes Section */}
          <div className="mt-8 border-t border-dashed pt-6">
            <p className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4">Subject Reference:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-[10px]">
              {Object.keys(scheduleData).map((key, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="font-bold text-gray-700">{scheduleData[key].code}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
             System Printed : 08-02-2026 06:40 PM
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentTimetable;