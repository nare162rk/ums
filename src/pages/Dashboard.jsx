import React from 'react';
import { LayoutDashboard, Users, GraduationCap, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
  const handleLogout = () => {
    // Clear session and go back to home
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900">UMS Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition">
            <Users size={20} /> Students
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome to your Dashboard</h1>
          <p className="text-slate-500">University Management System is running normally.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Students</p>
            <h3 className="text-2xl font-bold mt-1">1,284</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Active Courses</p>
            <h3 className="text-2xl font-bold mt-1">42</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Server Status</p>
            <h3 className="text-2xl font-bold mt-1 text-green-600">Online</h3>
          </div>
        </div>
      </main>
    </div>
  );
}