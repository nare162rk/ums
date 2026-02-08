import React from 'react';

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
    // ... add more as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-[11px]">
      {/* Header Info */}
      <div className="bg-white border-b p-3 flex justify-between items-center mb-4 shadow-sm">
        <h1 className="text-gray-500 text-lg font-light">Student Timetable <span className="text-[10px] uppercase">KARNATI LOHITHA SHRE</span></h1>
      </div>

      <div className="bg-white border border-gray-300 shadow-sm rounded-sm p-4 overflow-x-auto">
        {/* Timetable Branding */}
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
              <div className="leading-tight">
                <p className="text-red-600 font-bold text-sm">Parul University</p>
              </div>
           </div>
           <div className="text-center">
              <h2 className="text-sm font-bold">Parul Institute of Engineering & Technology (First Shift)</h2>
           </div>
           <div className="text-right leading-tight">
              <p className="font-bold">Student Timetable</p>
              <p>PIET-BTech-CSE-6CYBER1</p>
              <p>w.e.f 07-02-2026</p>
           </div>
        </div>

        {/* Timetable Grid */}
        <table className="w-full border-collapse border border-gray-400 text-center">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-400 p-2 w-32">Time Slot</th>
              {days.map(day => (
                <th key={day} className="border border-gray-400 p-2">
                  <p>{day}</p>
                  <p className="text-[9px] font-normal text-gray-500">02-02-2026</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, timeIdx) => (
              <tr key={timeIdx} className={slot.type === "BREAK" ? "bg-gray-50 h-8" : "h-16"}>
                <td className="border border-gray-400 font-bold p-1 bg-gray-50">
                  {slot.time}
                </td>
                
                {days.map((_, dayIdx) => {
                  if (slot.type === "BREAK") {
                    return <td key={dayIdx} className="border border-gray-400 text-gray-400 italic">BREAK</td>;
                  }
                  
                  const entry = scheduleData[`${dayIdx}-${timeIdx}`];
                  return (
                    <td key={dayIdx} className="border border-gray-400 p-1 align-middle">
                      {entry ? (
                        <div>
                          <p className="font-bold text-blue-800">{entry.code}</p>
                          <p className="text-gray-600 italic">{entry.faculty}</p>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend / Subject Codes Section */}
        <div className="mt-6 border-t pt-4">
          <p className="font-bold mb-2">Subject:</p>
          <div className="grid grid-cols-6 gap-2 text-[10px] text-gray-600">
            {Object.keys(scheduleData).map((key, i) => (
              <span key={i}>• {scheduleData[key].code}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-[9px] text-gray-400">
           Printed On : 07-02-2026 07:43 AM
        </div>
      </div>
    </div>
  );
};

export default StudentTimetable;