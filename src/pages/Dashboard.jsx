import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const handleLogout = () => {
    // Clear session and go back to home
    window.location.href = "/";
  };
    
  return (
    /* We use min-h-screen and flex-col to keep footer at the bottom */
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. Header sits at the top */}
      <Header />

      {/* 2. Main Content - flex-1 makes this area grow to push footer down */}
      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome to your Dashboard</h1>
          <p className="text-slate-500">University Management System is running normally.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Total Students</p>
            <h3 className="text-2xl font-bold mt-1">1,284</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Active Courses</p>
            <h3 className="text-2xl font-bold mt-1">42</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Server Status</p>
            <h3 className="text-2xl font-bold mt-1 text-green-600">Online</h3>
          </div>
        </div>
      </main>
      
      {/* 3. Footer sits at the bottom */}
      <Footer />
      
    </div>
  );
}