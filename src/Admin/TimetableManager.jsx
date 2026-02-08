import React, { useState } from 'react';
import { Settings, Save, Edit2, Trash2, Plus } from 'lucide-react';

const AdminTimetableManager = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    { time: "09:30 AM to 10:25 AM", id: 0 },
    { time: "10:25 AM to 11:20 AM", id: 1 },
    { time: "11:20 AM to 12:20 PM", type: "BREAK", id: 2 },
    { time: "12:20 PM to 01:15 PM", id: 3 },
    { time: "01:15 PM to 02:10 PM", id: 4 },
  ];

  // Admin State: Initializing with some dummy data
  const [schedule, setSchedule] = useState({
    "0-0": { code: "303105365", faculty: "Mr. AJAY SINGH", room: "L-101" },
    "1-3": { code: "303105386", faculty: "Ms. ANJALI LAKHARA", room: "Lab-2" },
  });

  const [isEditing, setIsEditing] = useState(null); // Track which cell is being edited

  const handleUpdateCell = (key, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const clearCell = (key) => {
    const newSchedule = { ...schedule };
    delete newSchedule[key];
    setSchedule(newSchedule);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      {/* Admin Control Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6 border-l-4 border-blue-600">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Timetable Management System
          </h1>
          <p className="text-slate-500 text-xs">Department: CSE | Batch: 6CYBER1</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-4 border border-slate-700 w-40 text-left text-xs uppercase tracking-wider">Time Slot</th>
              {days.map(day => (
                <th key={day} className="p-4 border border-slate-700 text-xs uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, timeIdx) => (
              <tr key={timeIdx} className={slot.type === "BREAK" ? "bg-slate-50" : "group"}>
                <td className="p-3 border border-slate-200 bg-slate-100 font-semibold text-slate-600 text-xs">
                  {slot.time}
                </td>

                {days.map((_, dayIdx) => {
                  const cellKey = `${dayIdx}-${timeIdx}`;
                  const entry = schedule[cellKey];

                  if (slot.type === "BREAK") {
                    return <td key={dayIdx} className="border border-slate-200 text-center text-slate-400 italic text-[10px]">BREAK</td>;
                  }

                  return (
                    <td key={dayIdx} className="border border-slate-200 p-2 relative min-w-[150px] transition-colors hover:bg-blue-50">
                      {entry ? (
                        <div className="flex flex-col gap-1">
                          <input 
                            value={entry.code} 
                            onChange={(e) => handleUpdateCell(cellKey, 'code', e.target.value)}
                            className="bg-transparent font-bold text-blue-700 border-none focus:ring-0 p-0 text-[11px] placeholder-blue-300"
                            placeholder="Sub Code"
                          />
                          <input 
                            value={entry.faculty} 
                            onChange={(e) => handleUpdateCell(cellKey, 'faculty', e.target.value)}
                            className="bg-transparent text-slate-600 text-[10px] border-none focus:ring-0 p-0 italic"
                            placeholder="Faculty Name"
                          />
                          <button 
                            onClick={() => clearCell(cellKey)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleUpdateCell(cellKey, 'code', 'NEW-SUB')}
                          className="w-full h-10 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 text-[10px] text-slate-400 italic">
        <p>* All changes are autosaved to local state</p>
        <p>* Hover over a slot to reveal delete options</p>
      </div>
    </div>
  );
};

export default AdminTimetableManager;