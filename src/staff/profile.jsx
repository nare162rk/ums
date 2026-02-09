import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Briefcase, MapPin, Phone, Mail, Globe, 
  Smartphone, PhoneCall, ShieldCheck, X 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

const StaffProfile = () => {
  const [activeTab, setActiveTab] = useState('Professional');
  const [modalType, setModalType] = useState(null);

  const staffData = {
    name: "Narendra",
    empId: "GB-EXE-001",
    role: "Founder & Director",
    dept: "Executive Board",
    branch: "Sattenapalle (H.O)",
    joiningDate: "01-12-2025",
    status: "Active / On-Duty",
    officialMail: "narendra@grambasket.com",
    personalMail: "narendra.p@gmail.com",
    phone: "+91 98765 43210",
    altPhone: "+91 88888 77777"
  };

  const tabContent = {
    Professional: {
      role: staffData.role, dept: staffData.dept, empId: staffData.empId,
      branch: staffData.branch, joinDate: staffData.joiningDate, shift: "09:00 AM - 06:30 PM",
      level: "L1 Admin", type: "Full-Time"
    },
    Contact: {
      official: staffData.officialMail, personal: staffData.personalMail,
      mobile: staffData.phone, emergency: staffData.altPhone,
      location: "Sattenapalle, Palnadu District, AP",
      linkedIn: "linkedin.com/in/narendra-gb"
    },
    Compliance: {
      gstStatus: "Verified", pfStatus: "Active", esicStatus: "Active",
      pan: "XXXXX1234X", aadhar: "XXXX-XXXX-9012", verification: "KYC Completed"
    },
    Payroll: {
      account: "ICICI Bank - 0012 XXXX", cycle: "Monthly (1st-5th)",
      currency: "INR (₹)", taxRegime: "Old", insurance: "Company Covered"
    }
  };

  const tabs = Object.keys(tabContent);

  const InfoRow = ({ label, value }) => (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.8)" }}
      className="flex flex-col p-4 rounded-2xl border border-slate-50 transition-all bg-white/50"
    >
      <span className="text-[9px] uppercase tracking-[0.2em] text-indigo-500 font-black mb-1">{label}</span>
      <span className="text-slate-800 font-bold text-sm">{value}</span>
    </motion.div>
  );

  return (
    <>
    <Header/>
    <div className="flex-grow p-4 md:p-10 relative bg-[#f8fafc] min-h-screen font-sans">
      {/* Abstract Background Design */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Section */}
        <motion.aside initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:col-span-4">
          <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100 text-center sticky top-10">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-indigo-200 rounded-[3.5rem]" />
              <div className="absolute inset-2 bg-white-900 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center">
                  <img
                   src="/logo.png"   // or your actual image path / URL
                   alt="Security"
                   className="w-20 h-20 object-contain"
                  />
               </div>

              <div className="absolute bottom-2 right-4 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
            </div>

            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{staffData.name}</h2>
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mt-2 italic">{staffData.role}</p>
            
            <div className="mt-8 space-y-3">
              <div className="bg-indigo-50 p-4 rounded-2xl text-left border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-indigo-400 uppercase">Employee ID</p>
                  <p className="text-sm font-bold text-slate-700">{staffData.empId}</p>
                </div>
                <Briefcase size={20} className="text-indigo-300" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase">Work Branch</p>
                  <p className="text-xs font-bold text-slate-600">{staffData.branch}</p>
                </div>
                <MapPin size={20} className="text-slate-300" />
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <motion.button whileHover={{ y: -3 }} onClick={() => setModalType('contact')} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center text-xl">
                <Phone size={20} />
              </motion.button>
              <motion.button whileHover={{ y: -3 }} className="w-14 h-14 bg-slate-800 text-white rounded-2xl shadow-xl flex items-center justify-center">
                <Mail size={20} />
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* Details Section */}
        <motion.main initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:col-span-8">
          <div className="bg-white/80 backdrop-blur-md border border-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden min-h-[600px]">
            <div className="flex bg-slate-50 p-2 gap-2 overflow-x-auto scrollbar-hide border-b border-slate-100">
              {tabs.map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`relative px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12 flex-grow">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {Object.entries(tabContent[activeTab]).map(([key, val]) => (
                    <InfoRow key={key} label={key.replace(/([A-Z])/g, ' $1')} value={val} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-800">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={18} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">KYC Status: Verified</span>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                Update Portfolio
              </motion.button>
            </div>
          </div>
        </motion.main>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {modalType === 'contact' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalType(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white rounded-[3rem] shadow-2xl max-w-md w-full overflow-hidden">
               <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-widest">Staff Contact</h3>
                  <button onClick={() => setModalType(null)}><X size={24} /></button>
               </div>
               <div className="p-8 space-y-4">
                  <ContactCard icon={<Mail className="text-indigo-500" />} label="Official" val={staffData.officialMail} />
                  <ContactCard icon={<Globe className="text-blue-500" />} label="Personal" val={staffData.personalMail} />
                  <ContactCard icon={<Smartphone className="text-emerald-500" />} label="Mobile" val={staffData.phone} />
                  <ContactCard icon={<PhoneCall className="text-orange-500" />} label="Alternate" val={staffData.altPhone} />
               </div>
               <button onClick={() => setModalType(null)} className="w-full p-6 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors">Close View</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    <Footer />
    </>
  );
};

const ContactCard = ({ icon, label, val }) => (
  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-indigo-500 uppercase">{label}</p>
      <p className="text-sm font-bold text-slate-800">{val}</p>
    </div>
  </motion.div>
);

export default StaffProfile;