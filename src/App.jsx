import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  Calendar,
  BarChart3,
  ArrowRight
} from "lucide-react";

/* ---------------- animation presets ---------------- */
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
             src="/logo.png"
             alt="UMS Logo"
             className="h-20 w-auto"
            />
          </div>


          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <a href="#features">Features</a>
            <a href="#roles">Stakeholders</a>
            <a href="#contact">Contact</a>
          </div>

          <button className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition">
            Login
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-28 px-6 relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-100 rounded-full blur-[120px]" />

        <motion.div {...fadeUp} className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">
            UMS,
            <br />
            <span className="text-indigo-600">Unified.</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Admissions, academics, attendance, timetables, faculty, students,
            analytics — all managed from one secure, intelligent platform.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button className="px-10 py-4 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2 hover:bg-indigo-500 transition">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="px-10 py-4 rounded-xl border border-slate-300 font-semibold hover:bg-slate-100 transition">
              Request Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= PROBLEM / STORY ================= */}
      <section className="py-28 px-6 bg-white">
        <motion.div {...fadeUp} className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6">
            Universities Are Complex Systems
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Most institutions still rely on spreadsheets, disconnected tools,
            and manual processes. UMS replaces this fragmentation with a
            structured, automated digital foundation.
          </p>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-28 px-6 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeUp} className="text-5xl font-extrabold text-center mb-20">
            What UMS Handles
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Feature
              icon={<ClipboardList />}
              title="Admissions & Enrollment"
              desc="End-to-end applicant tracking, document management, and admission workflows."
            />
            <Feature
              icon={<Calendar />}
              title="Attendance & Timetables"
              desc="Automated attendance with smart scheduling for students and faculty."
            />
            <Feature
              icon={<BookOpen />}
              title="Academic Management"
              desc="Courses, exams, grading, and academic records in one system."
            />
            <Feature
              icon={<Users />}
              title="Student Lifecycle"
              desc="Track students from admission to graduation with full history."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Data Security & Compliance"
              desc="Role-based access and compliance-ready institutional data."
            />
            <Feature
              icon={<BarChart3 />}
              title="Reports & Analytics"
              desc="Real-time insights to support informed leadership decisions."
            />
          </div>
        </div>
      </section>

      {/* ================= STAKEHOLDERS (FIXED, NO GAS) ================= */}
      <section id="roles" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeUp} className="text-5xl font-extrabold mb-16">
            Built for Every Stakeholder
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            <Stakeholder
              icon={<ShieldCheck size={28} />}
              title="University Administration"
              desc="Complete institutional visibility, compliance-ready data, and analytics-driven decision-making."
            />
            <Stakeholder
              icon={<Users size={28} />}
              title="Admission Counselors"
              desc="Centralized applicant tracking, document handling, and faster lead conversion."
            />
            <Stakeholder
              icon={<BookOpen size={28} />}
              title="Faculty"
              desc="Timetables, attendance, assessments, and student progress without administrative overload."
            />
            <Stakeholder
              icon={<GraduationCap size={28} />}
              title="Students"
              desc="Single portal for attendance, results, schedules, notifications, and academic records."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="contact" className="py-28 px-6 bg-indigo-600 text-white text-center">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-6">
            Ready to Modernize Your University?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Replace manual systems with a unified, secure, and scalable platform.
          </p>
          <button className="px-12 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition">
            Request a Demo
          </button>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 text-center text-sm text-slate-500 bg-white border-t">
        © 2026 UMS — University Management System
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Feature = ({ icon, title, desc }) => (
  <motion.div {...fadeUp} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-600">{desc}</p>
  </motion.div>
);

const Stakeholder = ({ icon, title, desc }) => (
  <motion.div {...fadeUp} className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:shadow-lg transition">
    <div className="flex gap-4 items-start">
      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  </motion.div>
);
