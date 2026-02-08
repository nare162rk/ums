import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Globe } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Hashes the password for secure backend transmission
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Hash the password immediately
      const secureKey = await hashPassword(formData.password);

      // 3. Send Token, Hash, and Origin Domain for Validation
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token: idToken, 
          secureKey: secureKey,
          originDomain: window.location.hostname // Automatically captures current domain
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Role-based Dashboard Access
        if (result.role === 'sys-admin') {
          navigate("/system-admin-dashboard");
        } else if (result.role === 'uni-admin') {
          navigate("/dashboard");
        } else {
          navigate("/student-portal");
        }
      } else {
        // Specific error messages (e.g., "University not approved" or "Unauthorized Domain")
        alert(result.message || "Access Denied.");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white mb-4 shadow-lg shadow-indigo-200">
            <img
              src="/logo.png"
              alt="UMS Logo"
              className="h-20 w-15 object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Access the UMS Portal</p>
          
          {/* Badge showing the current domain user is logging into */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Globe size={12} /> {window.location.hostname}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Official Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium"
                placeholder="admin@university.edu"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <span className="text-sm font-medium text-indigo-600 cursor-pointer hover:underline">Forgot?</span>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium"
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In to Portal"}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-xs font-medium">
          Multi-tenant isolation active. <br/>
          Secure end-to-end encrypted login.
        </p>
      </motion.div>
    </div>
  );
}