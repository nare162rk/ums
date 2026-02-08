import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Building2, Globe, MapPin, ShieldCheck, Mail, Phone, 
  ClipboardCheck, Calendar, BookOpen, Users, Lock, BarChart3, FileText, Upload, Check, X, Eye, EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const features = [
        { title: "Admissions", icon: ClipboardCheck },
        { title: "Attendance", icon: Calendar },
        { title: "Academics", icon: BookOpen },
        { title: "Lifecycle", icon: Users },
        { title: "Security", icon: Lock },
        { title: "Analytics", icon: BarChart3 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prev) => (prev + 0.4) % 360);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const [formData, setFormData] = useState({
        institutionType: 'University',
        name: '', address: '', email: '', contactNumber: '', logo: '',
        adminName: '', officialEmail: '', personalEmail: '',
        gstNumber: '', panNumber: '',
        password: '', confirmPassword: '',
        boardResolution: '', authLetter: '', regDetails: '', gstCert: '', panCert: ''
    });

    const passwordChecks = {
        length: formData.password.length >= 12 && formData.password.length <= 16,
        special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
        small: /[a-z]/.test(formData.password),
        big: /[A-Z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        match: formData.password === formData.confirmPassword && formData.confirmPassword !== ''
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            alert("Upload Error: Only PDF format is allowed.");
            e.target.value = "";
            return;
        }
        // In a real production app, you would upload this to Firebase Storage 
        // and save the URL. For this test, we store the filename.
        setFormData(prev => ({ ...prev, [field]: file.name }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!Object.values(passwordChecks).every(Boolean)) {
            alert("Please satisfy all password requirements.");
            return;
        }

        setLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
            
            // Constructing the object to match backend expectations
            const submissionData = {
                institutionType: formData.institutionType,
                name: formData.name,
                address: formData.address,
                email: formData.email,
                contactNumber: formData.contactNumber,
                admin: {
                    name: formData.adminName,
                    officialEmail: formData.officialEmail,
                    personalEmail: formData.personalEmail
                },
                taxInfo: {
                    gstNumber: formData.gstNumber,
                    panNumber: formData.panNumber
                },
                documents: {
                    boardResolution: formData.boardResolution,
                    authLetter: formData.authLetter,
                    regDetails: formData.regDetails,
                    gstCert: formData.gstCert,
                    panCert: formData.panCert
                },
                auth: {
                    password: formData.password // Note: Backend should hash this
                }
            };

            const res = await axios.post(`${API_BASE_URL}/universities/onboard`, submissionData);
            
            if (res.data.success) {
                alert(`✅ Registration successful! University ID: ${res.data.universityId}`);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Submission failed. Check if backend is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    const ValidationItem = ({ met, text }) => (
        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${met ? 'text-emerald-500' : 'text-rose-500'}`}>
            {met ? <Check size={12} /> : <X size={12} />} {text}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-6 px-4 md:py-12">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
                
                {/* Left Sidebar - Branding & Animation */}
                <div className="lg:col-span-4 bg-indigo-700 p-8 text-white flex flex-col items-center justify-between relative overflow-hidden hidden lg:flex">
                    <div className="z-10 text-center">
                        <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-xl">
                            <img src="/logo.png" className="h-12 w-12 object-contain" alt="Logo" />
                        </div>
                        <h1 className="text-2xl font-black italic tracking-tighter">UMS PARTNERS</h1>
                    </div>

                    <div className="relative flex items-center justify-center w-full h-[400px]">
                        <div className="absolute w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
                            {features.map((f, i) => {
                                const angle = (i * (360 / features.length));
                                return (
                                    <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                         style={{ transform: `rotate(${angle}deg) translateY(-130px) rotate(-${angle + rotation}deg)` }}>
                                        <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col items-center min-w-[80px]">
                                            <f.icon className="w-5 h-5 text-indigo-600 mb-1" />
                                            <span className="text-[9px] font-bold text-slate-800 tracking-tighter uppercase">{f.title}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="z-10 bg-white/10 p-6 rounded-full border border-white/20 backdrop-blur-md">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                    </div>

                    <div className="text-center space-y-2 z-10">
                        <p className="text-[10px] tracking-wider uppercase opacity-60">© 2026 UMSystems</p>
                        <div className="text-[11px] font-medium opacity-80">
                            Powered by <span className="text-green-400 font-bold">GRAMBASKET PVT LTD</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 p-6 md:p-12 space-y-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
                    
                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-slate-800 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                            <Building2 className="text-indigo-600" size={20} /> Institute Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-slate-700" 
                                    onChange={e => setFormData({...formData, institutionType: e.target.value})}>
                                <option>University</option><option>College</option><option>School</option><option>Deemed to be University</option>
                            </select>
                            <input required placeholder="Institute Full Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
                            <input required placeholder="Full Institute Address" className="p-4 bg-slate-50 border border-slate-200 rounded-xl md:col-span-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, address: e.target.value})} />
                            <input required type="email" placeholder="Official Institute Email" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, email: e.target.value})} />
                            <input required placeholder="Contact Number" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-slate-800 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                            <Users className="text-indigo-600" size={20} /> Authorized Representative
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required placeholder="Representative Full Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, adminName: e.target.value})} />
                            <input required type="email" placeholder="Admin Official Email" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, officialEmail: e.target.value})} />
                            <input required type="email" placeholder="Admin Personal Email" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, personalEmail: e.target.value})} />
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FileField label="Board Resolution" onChange={e => handleFileChange(e, 'boardResolution')} />
                                <FileField label="Authorization Letter" onChange={e => handleFileChange(e, 'authLetter')} />
                                <FileField label="Registration Details" onChange={e => handleFileChange(e, 'regDetails')} />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-slate-800 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                            <BarChart3 className="text-indigo-600" size={20} /> Tax & Compliance
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required placeholder="GST Number" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, gstNumber: e.target.value})} />
                            <input required placeholder="PAN Number" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={e => setFormData({...formData, panNumber: e.target.value})} />
                            <FileField label="GST Certificate" onChange={e => handleFileChange(e, 'gstCert')} />
                            <FileField label="PAN Certificate" onChange={e => handleFileChange(e, 'panCert')} />
                        </div>
                    </section>

                    <section className="space-y-6 bg-indigo-50/40 p-6 rounded-3xl border border-indigo-100">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                            <Lock className="text-indigo-600" size={20} /> Security Credentials
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <input required type={showPassword ? "text" : "password"} placeholder="Set Password" 
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
                                        onChange={e => setFormData({...formData, password: e.target.value})} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 p-2 bg-white/50 rounded-lg border border-slate-100">
                                    <ValidationItem met={passwordChecks.length} text="12-16 Chars" />
                                    <ValidationItem met={passwordChecks.special} text="Special Symbol" />
                                    <ValidationItem met={passwordChecks.small} text="Lowercase" />
                                    <ValidationItem met={passwordChecks.big} text="Uppercase" />
                                    <ValidationItem met={passwordChecks.number} text="Number" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <input required type="password" placeholder="Confirm Password" 
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
                                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                                <div className="p-2">
                                    <ValidationItem met={passwordChecks.match} text="Passwords Match" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl transition-all transform active:scale-[0.98] disabled:bg-slate-300 uppercase tracking-widest text-sm">
                        {loading ? "Processing Registration..." : "Complete Registration"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const FileField = ({ label, onChange }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">{label} (PDF Only)</label>
        <div className="relative">
            <input required type="file" accept=".pdf" onChange={onChange} className="text-[11px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-100 file:text-indigo-700 font-bold cursor-pointer hover:file:bg-indigo-200 transition-all border border-slate-200 rounded-xl w-full p-2 bg-slate-50" />
        </div>
    </div>
);

export default RegistrationPage;