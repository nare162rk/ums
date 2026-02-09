import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, BookOpen, MapPin, Users, GraduationCap, Settings,
  CheckCircle2, ChevronRight, ChevronLeft, Camera, Plus, Trash2
} from 'lucide-react';

const AddStudent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal
    title: 'Mr', studentName: '', gender: 'Male', dob: '', bloodGroup: '', aadharNo: '',
    studentPhoto: null,
    // Admission 
    program: '', admissionYear: '2026', erpPrefix: '', degreeType: 'UG',
    department: '', enrollmentNo: '', admissionDate: '',
    // Contact
    mobile: '', email: '', emergencyContact: '', emergencyNo: '',
    // Address
    presentAddress: { street: '', city: '', district: '', state: '', pincode: '' },
    permanentAddress: { street: '', city: '', district: '', state: '', pincode: '' },
    // Family
    fatherName: '', fatherMobile: '', fatherEmail: '',
    motherName: '', motherMobile: '', motherEmail: '',
    // Education 
    education: [{ degree: '', school: '', board: '', percentage: '', passingYear: '' }]
  });

  const steps = [
    { id: 1, title: 'Personal', icon: <User size={18}/> },
    { id: 2, title: 'Admission', icon: <BookOpen size={18}/> },
    { id: 3, title: 'Contact & Address', icon: <MapPin size={18}/> },
    { id: 4, title: 'Family Details', icon: <Users size={18}/> },
    { id: 5, title: 'Education', icon: <GraduationCap size={18}/> }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const universityId = savedUser.universityId || "UNI-DEFAULT";

    // Crucial: Append universityId separately so the backend can find it
    data.append('universityId', universityId);
    data.append('studentData', JSON.stringify(formData));
    if (formData.studentPhoto) {
      data.append('photo', formData.studentPhoto);
    }

    try {
      const response = await fetch('http://localhost:5000/students/admission', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        alert(`Success! Student admitted with ERP: ${result.erpNo}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Admission</h1>
            <p className="text-slate-500 font-medium">Create a new student profile in the university ecosystem.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Step {currentStep} of {steps.length}</p>
            <div className="flex gap-1 mt-2">
              {steps.map(s => (
                <div key={s.id} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${currentStep >= s.id ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Step Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Sidebar Nav (Desktop) */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-4 gap-4 overflow-x-auto">
            {steps.map((s) => (
              <div 
                key={s.id} 
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${currentStep === s.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
              >
                <div className={`p-2 rounded-lg ${currentStep === s.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {currentStep > s.id ? <CheckCircle2 size={16}/> : s.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">{s.title}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && <PersonalInfo data={formData} update={updateField} />}
                {currentStep === 2 && <AdmissionInfo data={formData} update={updateField} />}
                {currentStep === 3 && <ContactAddress data={formData} setFormData={setFormData} />}
                {currentStep === 4 && <FamilyInfo data={formData} update={updateField} />}
                {currentStep === 5 && <EducationInfo data={formData} setFormData={setFormData} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all ${currentStep === 1 ? 'opacity-0' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              <ChevronLeft size={18}/> Previous
            </button>
            
            {currentStep === steps.length ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-black text-sm shadow-lg shadow-emerald-200 uppercase tracking-widest disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Finish & Save Student"}
              </motion.button>
            ) : (
              <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-700 transition-all uppercase tracking-widest"
              >
                Next Step <ChevronRight size={18}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const PersonalInfo = ({ data, update }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      update('studentPhoto', file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-8 bg-slate-50 hover:border-indigo-300 transition-colors">
        <div className="relative w-32 h-32 mb-4 group">
          <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400 overflow-hidden border-4 border-white shadow-lg">
            {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <Camera size={40} />}
          </div>
          <input type="file" id="photo" hidden accept="image/*" onChange={handleFile} />
        </div>
        <label htmlFor="photo" className="cursor-pointer text-[10px] font-black uppercase text-indigo-600 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-indigo-50 transition-colors">
          {preview ? "Change Photo" : "Upload Photo"}
        </label>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Student Full Name" value={data.studentName} onChange={(e) => update('studentName', e.target.value)} />
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
          <select 
            value={data.gender} 
            onChange={(e) => update('gender', e.target.value)}
            className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-indigo-500/20"
          >
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <Input label="Date of Birth" type="date" value={data.dob} onChange={(e) => update('dob', e.target.value)} />
        <Input label="Aadhar Card No" placeholder="0000 0000 0000" value={data.aadharNo} onChange={(e) => update('aadharNo', e.target.value)} />
      </div>
    </div>
  );
};

const AdmissionInfo = ({ data, update }) => (
  <div className="space-y-8">
    <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
      <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Settings size={14}/> ERP Generation Logic
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="Year Code (YY)" placeholder="26" value={data.admissionYear} onChange={(e) => update('admissionYear', e.target.value)} />
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Degree Type</label>
          <select 
            value={data.degreeType} 
            onChange={(e) => update('degreeType', e.target.value)}
            className="bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold"
          >
            <option>UG</option><option>PG</option><option>PHD</option>
          </select>
        </div>
        <Input label="Serial Start" placeholder="0001" disabled />
      </div>
      <p className="mt-4 text-[11px] text-indigo-400 font-medium italic">Preview: {data.admissionYear.slice(-2)}{data.degreeType.slice(0,2)}0001</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input label="Program / Course" value={data.program} onChange={(e) => update('program', e.target.value)} />
      <Input label="Department" value={data.department} onChange={(e) => update('department', e.target.value)} />
      <Input label="Enrollment Number" value={data.enrollmentNo} onChange={(e) => update('enrollmentNo', e.target.value)} />
      <Input label="Admission Date" type="date" value={data.admissionDate} onChange={(e) => update('admissionDate', e.target.value)} />
    </div>
  </div>
);

const ContactAddress = ({ data, setFormData }) => {
  const syncAddress = () => {
    setFormData(prev => ({ ...prev, permanentAddress: { ...prev.presentAddress } }));
  };

  const updateAddr = (type, field, val) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: val }
    }));
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Student Mobile" value={data.mobile} onChange={(e) => setFormData(p => ({...p, mobile: e.target.value}))} />
        <Input label="Email" value={data.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b pb-2">Present Address</h4>
          <Input label="Street" value={data.presentAddress.street} onChange={(e) => updateAddr('presentAddress', 'street', e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" value={data.presentAddress.city} onChange={(e) => updateAddr('presentAddress', 'city', e.target.value)} />
            <Input label="Pincode" value={data.presentAddress.pincode} onChange={(e) => updateAddr('presentAddress', 'pincode', e.target.value)} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
             <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Permanent Address</h4>
             <button onClick={syncAddress} className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Copy Present</button>
          </div>
          <Input label="Street" value={data.permanentAddress.street} onChange={(e) => updateAddr('permanentAddress', 'street', e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" value={data.permanentAddress.city} onChange={(e) => updateAddr('permanentAddress', 'city', e.target.value)} />
            <Input label="Pincode" value={data.permanentAddress.pincode} onChange={(e) => updateAddr('permanentAddress', 'pincode', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FamilyInfo = ({ data, update }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    <div className="space-y-6">
       <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Father's Details</h4>
       <Input label="Father Name" value={data.fatherName} onChange={(e) => update('fatherName', e.target.value)} />
       <Input label="Mobile Number" value={data.fatherMobile} onChange={(e) => update('fatherMobile', e.target.value)} />
       <Input label="Email" value={data.fatherEmail} onChange={(e) => update('fatherEmail', e.target.value)} />
    </div>
    <div className="space-y-6">
       <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Mother's Details</h4>
       <Input label="Mother Name" value={data.motherName} onChange={(e) => update('motherName', e.target.value)} />
       <Input label="Mobile Number" value={data.motherMobile} onChange={(e) => update('motherMobile', e.target.value)} />
       <Input label="Email" value={data.motherEmail} onChange={(e) => update('motherEmail', e.target.value)} />
    </div>
  </div>
);

const EducationInfo = ({ data, setFormData }) => {
  const addEdu = () => setFormData(p => ({...p, education: [...p.education, { degree: '', school: '', board: '', percentage: '', passingYear: '' }]}));
  const updateEdu = (i, f, v) => {
    const newList = [...data.education];
    newList[i][f] = v;
    setFormData(p => ({...p, education: newList}));
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <motion.div layout key={index} className="p-6 rounded-3xl border border-slate-200 bg-slate-50 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Degree" value={edu.degree} onChange={(e) => updateEdu(index, 'degree', e.target.value)} />
            <Input label="School Name" value={edu.school} onChange={(e) => updateEdu(index, 'school', e.target.value)} />
            <Input label="Board" value={edu.board} onChange={(e) => updateEdu(index, 'board', e.target.value)} />
            <Input label="Passing Year" value={edu.passingYear} onChange={(e) => updateEdu(index, 'passingYear', e.target.value)} />
            <Input label="Percentage" value={edu.percentage} onChange={(e) => updateEdu(index, 'percentage', e.target.value)} />
          </div>
        </motion.div>
      ))}
      <button onClick={addEdu} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-3xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
        <Plus size={18}/> Add Another Qualification
      </button>
    </div>
  );
};

const Input = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
      {...props}
    />
  </div>
);

export default AddStudent;