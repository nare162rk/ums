import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle, XCircle, Clock, Search, Filter, 
  LayoutDashboard, Building, Users, Settings, 
  RefreshCw, TrendingUp, Download, ExternalLink 
} from 'lucide-react';

const AdminDashboard = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // --- REAL-TIME DATA FETCH FROM PRODUCTION API ---
    const fetchUniversities = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/universities`);
            setList(res.data);
        } catch (err) {
            console.error("Critical: Data Sync Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    // --- LIVE ACTION: UPDATE FIRESTORE STATUS ---
    const handleStatusUpdate = async (uniId, newStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/admin/status/${uniId}`, { 
                status: newStatus 
            });
            // Instant local update for seamless UI
            setList(prev => prev.map(u => 
                u.universityId === uniId ? { ...u, status: newStatus } : u
            ));
        } catch (err) {
            alert("Database write failed. Check server logs.");
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            pending: "bg-amber-100 text-amber-700 border-amber-200",
            approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
            rejected: "bg-rose-100 text-rose-700 border-rose-200"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.pending}`}>
                {status}
            </span>
        );
    };

    // --- PRODUCTION FILTER LOGIC ---
    const filteredList = list.filter(u => {
        const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.universityId?.includes(searchQuery);
        const matchesTab = activeTab === "all" || u.status === activeTab;
        return matchesSearch && matchesTab;
    });

    // --- CALCULATE LIVE STATS ---
    const totalCount = list.length;
    const pendingCount = list.filter(u => u.status === 'pending').length;

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* --- MNC SIDEBAR --- */}
            <aside className="w-72 bg-slate-950 text-white p-8 hidden lg:flex flex-col border-r border-white/5">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Building size={20} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter italic">UMS <span className="text-indigo-500">PRO</span></h2>
                </div>

                <nav className="space-y-3">
                    <button className="w-full flex items-center gap-4 px-5 py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all">
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        <Building size={18} /> Institutions
                    </button>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        <Users size={18} /> Staff Admins
                    </button>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        <Settings size={18} /> Global Config
                    </button>
                </nav>

                <div className="mt-auto p-6 bg-indigo-600/10 rounded-[2rem] border border-indigo-500/20">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">System Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-xs font-bold">Server: Optimal</p>
                    </div>
                </div>
            </aside>

            {/* --- MAIN COMMAND AREA --- */}
            <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
                
                {/* Global Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">Command Center</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Infrastructure Management</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Download size={16} /> Export CSV
                        </button>
                        <button onClick={fetchUniversities} className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
                            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                {/* Real Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {[
                        { label: "Partner Institutions", value: totalCount, icon: Building, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Awaiting Review", value: pendingCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                        { label: "Active Nodes", value: "8", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "System Admins", value: "3", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <stat.icon size={28} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Data Matrix */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                    <div className="p-10 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search by ID or Name..." 
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-slate-800 shadow-inner"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                                        activeTab === tab ? 'bg-white text-indigo-600 shadow-md translate-y-[-1px]' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reference</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institution Hub</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Status</th>
                                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="4" className="p-32 text-center text-slate-400 font-black italic tracking-widest animate-pulse">Syncing Cloud Database...</td></tr>
                                ) : filteredList.map(u => (
                                    <tr key={u.universityId} className="group hover:bg-indigo-50/30 transition-all">
                                        <td className="px-10 py-8">
                                            <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 italic">
                                                #{u.universityId}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                                                    {u.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-lg tracking-tighter leading-tight">{u.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{u.admin?.officialEmail}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <StatusBadge status={u.status} />
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex justify-end items-center gap-3">
                                                <button 
                                                    onClick={() => handleStatusUpdate(u.universityId, 'approved')}
                                                    className="w-11 h-11 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(u.universityId, 'rejected')}
                                                    className="w-11 h-11 flex items-center justify-center bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                                <div className="w-px h-8 bg-slate-100 mx-2"></div>
                                                <button className="w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-90">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;