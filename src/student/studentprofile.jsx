import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Linkedin, Youtube, 
  Mail, Phone, MessageCircle, LayoutDashboard, 
  GraduationCap, CalendarDays, CreditCard, 
  ChevronDown, UserCircle, LogOut, Settings 
} from 'lucide-react';

// --- HEADER COMPONENT ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, link: '#' },
    { name: 'Timetable', icon: <CalendarDays size={18} />, link: '#' },
    { name: 'Fees', icon: <CreditCard size={18} />, link: '#' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-full h-16 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </motion.div>

        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              whileHover={{ y: -2, color: '#2563eb' }}
              className="flex items-center gap-2 transition-colors"
            >
              {item.icon} {item.name}
            </motion.a>
          ))}
          <div className="relative group cursor-pointer">
            <motion.div whileHover={{ y: -2 }} className="flex items-center gap-1 group-hover:text-blue-600">
              <GraduationCap size={18} /> Exam <ChevronDown size={14} />
            </motion.div>
            <div className="absolute top-full left-0 hidden group-hover:block w-44 bg-white shadow-xl rounded-xl border border-gray-100 mt-2 py-2 overflow-hidden">
              <a href="#" className="block px-4 py-2 hover:bg-blue-50 text-sm transition-colors">Admit Card</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-50 text-sm transition-colors">Results</a>
            </div>
          </div>
        </nav>

        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-transparent hover:border-blue-200 transition-all"
          >
            <UserCircle size={32} className="text-blue-600" />
            <span className="hidden md:inline font-medium text-gray-700">Aarav Mehta</span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 z-50"
              >
                <div className="lg:hidden px-4 pb-3 border-b border-gray-100 flex flex-col gap-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Navigation</p>
                  {navLinks.map((item) => (
                    <a key={item.name} href={item.link} className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600">
                      {item.icon} {item.name}
                    </a>
                  ))}
                </div>
                <div className="pt-2">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={18} /> Settings
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={18} /> Logout
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- FOOTER COMPONENT ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <Instagram size={18} />, color: 'hover:text-pink-500', link: '#' },
    { icon: <Linkedin size={18} />, color: 'hover:text-blue-500', link: '#' },
    { icon: <Facebook size={18} />, color: 'hover:text-blue-600', link: '#' },
    { icon: <Youtube size={18} />, color: 'hover:text-red-500', link: '#' },
    { icon: <MessageCircle size={18} />, color: 'hover:text-green-500', link: '#' },
  ];

  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-6 px-4 md:px-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <motion.a whileHover={{ scale: 1.05, color: '#fff' }} href="mailto:admin@umsystems.in" className="flex items-center gap-2 transition-colors">
              <Mail size={16} className="text-blue-500" /> admin@umsystems.in
            </motion.a>
            <motion.a whileHover={{ scale: 1.05, color: '#fff' }} href="tel:+910000000000" className="flex items-center gap-2 transition-colors">
              <Phone size={16} className="text-blue-500" /> +91 00000 00000
            </motion.a>
          </div>
          <div className="flex gap-5">
            {socialLinks.map((social, index) => (
              <motion.a key={index} href={social.link} whileHover={{ y: -4, scale: 1.2 }} whileTap={{ scale: 0.9 }} className={`${social.color} transition-colors duration-300`}>
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />
        <div className="text-center space-y-2">
          <p className="text-[11px] md:text-xs tracking-wider uppercase text-gray-500">© {currentYear} UMSystems. All rights reserved.</p>
          <div className="text-[13px] flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span className="text-gray-400">Designed & Developed by</span>
            <motion.span whileHover={{ color: '#60a5fa' }} className="text-white font-semibold cursor-default">UMSystems</motion.span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Powered by</span>
            <motion.span whileHover={{ letterSpacing: '1px' }} className="text-green-500 font-bold transition-all">GRAMBASKET PVT LIMITED</motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PROFILE BODY ---
const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [modalType, setModalType] = useState(null);

  const profileData = {
    name: "Aarav Mehta",
    enrollment: "STU2025CS01",
    id: "600000000007",
    course: "BTech - Computer Science (Semester - 6)",
    batch: "2022-2026 | Group B-59",
    dob: "18-09-2005",
    phone: "+91 9012345678",
    father: "Suresh Mehta",
    fatherPhone: "+91 9898765432",
    mother: "Anita Mehta",
    motherPhone: "+91 9123987654",
    email: "aarav.mehta@ums.ac.in",
    AltEmail: "mehta.aarav@gmail.com"
  };

  const tabData = {
    Personal: {
      gender: "Male", religion: "Hinduism", category: "General",
      nationality: "Indian", bloodGroup: "O+", aadhar: "xxxx-xxxx-4821",
      tongue: "Gujarati", domicile: "Gujarat"
    },
    Admission: {
      date: "12-07-2022", type: "Regular", quota: "Merit",
      year: "2025-2026", semester: "Semester - 6", status: "Paid"
    },
    Contact: {
      present: "H-No 302, Shree Residency, Ahmedabad, Gujarat - 380009",
      permanent: "H-No 302, Shree Residency, Ahmedabad, Gujarat - 380009",
      mobile: "+91 9012345678", emergency: "+91 9898765432"
    },
    Parents: {
      fName: "Suresh Mehta", fOcc: "Business",
      mName: "Anita Mehta", mOcc: "Homemaker", income: "₹ 8,50,000"
    },
    "Education Qualification": {
      tenth: "GSEB (92%)", twelfth: "GSEB (89%)",
      cgpa: "8.5 (Current)", college: "University Management System"
    }
  };

  const tabs = ["Personal", "Admission", "Contact", "Parents", "Education Qualification"];
  const fastSpring = { type: "spring", stiffness: 500, damping: 35 };

  const InfoRow = ({ label, value }) => (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.6)" }}
      className="flex flex-col p-3 rounded-xl border-b border-blue-50/50 transition-all cursor-pointer"
    >
      <span className="text-[9px] uppercase tracking-widest text-blue-500 font-black mb-0.5">{label}</span>
      <span className="text-slate-800 font-bold text-sm">{value}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f4f7fa]">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex-grow p-4 md:p-8 relative overflow-hidden"
      >
        {/* Background Blobs */}
        <div className="fixed inset-0 -z-10">
          <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-[80px]" />
          <motion.div animate={{ x: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-0 -right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-[80px]" />
        </div>

        <header className="max-w-7xl mx-auto mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">Student<span className="text-blue-600">Portal</span></h1>
            <div className="h-1 w-12 bg-blue-600 rounded-full mt-1" />
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{profileData.enrollment}</span>
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          <motion.aside className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-xl p-6 text-center sticky top-24">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                onClick={() => setModalType('photo')}
                className="relative w-32 h-32 mx-auto mb-4 cursor-pointer group"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <img src="/photo.jpeg" alt="Student" className="relative w-full h-full rounded-3xl object-cover border-4 border-white shadow-md transition-transform group-active:scale-95" />
              </motion.div>
              <h2 className="text-lg font-black text-slate-800 leading-tight">{profileData.name}</h2>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1">Undergraduate Student</p>
              <div className="mt-6 space-y-2">
                <div className="bg-blue-50/50 p-3 rounded-2xl text-left border border-blue-100/50">
                  <p className="text-[9px] font-black text-blue-400 uppercase">Degree Path</p>
                  <p className="text-[11px] font-bold text-slate-700">{profileData.course}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <motion.button whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setModalType('photo')} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center text-xl">🖼️</motion.button>
                <motion.button whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setModalType('call')} className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl shadow-sm border border-green-100 flex items-center justify-center text-xl">📞</motion.button>
              </div>
            </div>
          </motion.aside>

          <motion.main className="lg:col-span-9">
            <div className="bg-white/90 backdrop-blur-md border border-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[550px] flex flex-col">
              <div className="flex bg-slate-100/50 p-1.5 gap-1 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{tab}</button>
                ))}
              </div>
              <div className="p-8 md:p-10 flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeTab === 'Personal' && (
                      <>
                        <InfoRow label="Gender" value={tabData.Personal.gender} />
                        <InfoRow label="Religion" value={tabData.Personal.religion} />
                        <InfoRow label="Nationality" value={tabData.Personal.nationality} />
                        <InfoRow label="Blood Group" value={tabData.Personal.bloodGroup} />
                        <InfoRow label="Category" value={tabData.Personal.category} />
                        <InfoRow label="Aadhar" value={tabData.Personal.aadhar} />
                        <InfoRow label="Mother Tongue" value={tabData.Personal.tongue} />
                        <InfoRow label="Domicile" value={tabData.Personal.domicile} />
                      </>
                    )}
                    {activeTab === 'Admission' && (
                      <>
                        <InfoRow label="Admission Date" value={tabData.Admission.date} />
                        <InfoRow label="Entry Type" value={tabData.Admission.type} />
                        <InfoRow label="Quota" value={tabData.Admission.quota} />
                        <InfoRow label="Academic Year" value={tabData.Admission.year} />
                        <InfoRow label="Semester" value={tabData.Admission.semester} />
                        <InfoRow label="Fee Status" value={tabData.Admission.status} />
                      </>
                    )}
                    {activeTab === 'Contact' && (
                      <div className="col-span-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InfoRow label="Personal Mobile" value={tabData.Contact.mobile} />
                          <InfoRow label="Emergency Contact" value={tabData.Contact.emergency} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-1">Present Address</p><p className="text-xs font-bold text-slate-700">{tabData.Contact.present}</p></div>
                          <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-1">Permanent Address</p><p className="text-xs font-bold text-slate-700">{tabData.Contact.permanent}</p></div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'Parents' && (
                      <>
                        <InfoRow label="Father Name" value={tabData.Parents.fName} />
                        <InfoRow label="Father Occupation" value={tabData.Parents.fOcc} />
                        <InfoRow label="Mother Name" value={tabData.Parents.mName} />
                        <InfoRow label="Mother Occupation" value={tabData.Parents.mOcc} />
                        <InfoRow label="Annual Income" value={tabData.Parents.income} />
                      </>
                    )}
                    {activeTab === 'Education Qualification' && (
                      <>
                        <InfoRow label="10th Mark" value={tabData["Education Qualification"].tenth} />
                        <InfoRow label="12th Mark" value={tabData["Education Qualification"].twelfth} />
                        <InfoRow label="Current CGPA" value={tabData["Education Qualification"].cgpa} />
                        <div className="col-span-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-1">College/University</p><p className="text-xs font-bold text-slate-700">{tabData["Education Qualification"].college}</p></div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">VERIFIED STATUS: ACTIVE</span>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Confirm Details</motion.button>
              </div>
            </div>
          </motion.main>
        </div>

        {/* MODALS */}
        <AnimatePresence>
          {modalType && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalType(null)}>
              {modalType === 'photo' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={fastSpring} className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                  <img src="/photo.jpeg" alt="Full Profile" className="w-full rounded-[2rem] shadow-inner" />
                  <button onClick={() => setModalType(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center font-bold">✕</button>
                </motion.div>
              )}
              {modalType === 'call' && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={fastSpring} className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="bg-green-600 p-6 text-white"><h3 className="text-xl font-black uppercase tracking-widest">Contact Directory</h3></div>
                  <div className="p-6 space-y-3">
                    {[{ label: 'Student', name: profileData.name, phone: profileData.phone }, { label: 'Father', name: profileData.father, phone: profileData.fatherPhone }, { label: 'Mother', name: profileData.mother, phone: profileData.motherPhone }].map((contact, i) => (
                      <motion.a key={i} href={`tel:${contact.phone}`} whileHover={{ x: 5, backgroundColor: '#f8fafc' }} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 transition-colors group">
                        <div><p className="text-[10px] font-black uppercase text-green-500">{contact.label}</p><p className="font-bold text-slate-800">{contact.name}</p></div>
                        <div className="flex items-center gap-2"><span className="text-sm font-black text-slate-400 group-hover:text-green-600 transition-colors">{contact.phone}</span><span className="text-lg">📞</span></div>
                      </motion.a>
                    ))}
                  </div>
                  <button onClick={() => setModalType(null)} className="w-full p-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase hover:text-slate-900 transition-colors">Close</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
    </div>
  );
};

export default StudentProfile;