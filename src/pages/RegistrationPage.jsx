import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Building2, Globe, MapPin, ShieldCheck, Mail, Phone, 
  ClipboardCheck, Calendar, BookOpen, Users, Lock, BarChart3 
} from 'lucide-react';

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const features = [
        { title: "Admissions & Enrollment", desc: "End-to-end applicant tracking and workflows.", icon: ClipboardCheck },
        { title: "Attendance & Timetables", desc: "Automated scheduling for students and faculty.", icon: Calendar },
        { title: "Academic Management", desc: "Courses, exams, and grading in one system.", icon: BookOpen },
        { title: "Student Lifecycle", desc: "Track students from admission to graduation.", icon: Users },
        { title: "Data Security & Compliance", desc: "Role-based access and secure institutional data.", icon: Lock },
        { title: "Reports & Analytics", desc: "Real-time insights for informed leadership.", icon: BarChart3 },
    ];

    // Auto-scroll animation logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [features.length]);

    const [formData, setFormData] = useState({
        institutionType: 'University',
        name: '', logoUrl: '', website: '', misUrl: '',
        address: { fullAddress: '', city: '', state: '', country: 'India', pincode: '' },
        admin: { name: '', phone: '', officialEmail: '', personalEmail: '' },
        documents: { boardResolution: '', registrationDocument: '' }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/universities/onboard`, formData);
            alert(`✅ Success! ID: ${res.data.universityId}`);
        } catch (err) {
            alert("Submission failed.");
        } finally { setLoading(false); }
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
            <Icon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-12 px-4">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 min-h-[850px]">
                
                {/* Left Sidebar - Branding & Animated Features */}
                <div className="lg:col-span-4 bg-indigo-700 p-10 text-white flex flex-col">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white mb-6 shadow-xl">
                            <img src="/logo.png" alt="UMS Logo" className="h-16 w-16 object-contain" />
                        </div>
                        <h1 className="text-3xl font-extrabold leading-tight">University Partners</h1>
                        <p className="mt-3 text-indigo-100">Join our global network and digitize your campus.</p>
                    </div>

                    {/* Animated Feature List */}
                    <div className="flex-grow relative overflow-hidden mt-4">
                        <div className="absolute inset-0 flex flex-col gap-4 transition-transform duration-700 ease-in-out"
                             style={{ transform: `translateY(-${activeIndex * 110}px)` }}>
                            {features.map((f, i) => (
                                <div key={i} className={`p-5 rounded-2xl border transition-all duration-500 shrink-0 ${
                                    activeIndex === i ? 'bg-white/15 border-white/30 scale-100 shadow-lg' : 'opacity-40 scale-95 border-transparent'
                                }`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <f.icon className="w-6 h-6 text-indigo-300" />
                                        <h3 className="font-bold text-lg">{f.title}</h3>
                                    </div>
                                    <p className="text-sm text-indigo-100 leading-snug">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 text-xs text-indigo-300">
                        © 2026 University Management System. <br/> Secure Enterprise Infrastructure.
                    </div>
                </div>

                {/* Right Side - Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 p-10 md:p-16 space-y-10 overflow-y-auto max-h-[850px] custom-scrollbar">
                    
                    <section>
                        <SectionHeader icon={ShieldCheck} title="Institution Identity" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">Institution Type</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                                    onChange={e => setFormData({...formData, institutionType: e.target.value})}>
                                    <option>University</option>
                                    <option>College</option>
                                    <option>Deemed University</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">Official Name</label>
                                <input required type="text" placeholder="Institution Full Name" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                                    onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                        </div>
                    </section>

                    <section>
                        <SectionHeader icon={MapPin} title="Location Details" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input className="md:col-span-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Street Address" onChange={e => setFormData({...formData, address: {...formData.address, fullAddress: e.target.value}})} />
                            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="City" onChange={e => setFormData({...formData, address: {...formData.address, city: e.target.value}})} />
                            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="State" onChange={e => setFormData({...formData, address: {...formData.address, state: e.target.value}})} />
                            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Pincode" onChange={e => setFormData({...formData, address: {...formData.address, pincode: e.target.value}})} />
                        </div>
                    </section>

                    <section>
                        <SectionHeader icon={Mail} title="Authorized Representative" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Full Name" onChange={e => setFormData({...formData, admin: {...formData.admin, name: e.target.value}})} />
                            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Phone" onChange={e => setFormData({...formData, admin: {...formData.admin, phone: e.target.value}})} />
                            <input className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Official Email Address" onChange={e => setFormData({...formData, admin: {...formData.admin, officialEmail: e.target.value}})} />
                        </div>
                    </section>

                    <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform active:scale-[0.98] disabled:bg-slate-300 uppercase tracking-widest">
                        {loading ? "Registering..." : "Submit Registration"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;