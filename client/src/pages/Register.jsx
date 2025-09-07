import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Sparkles, Shield, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://192.168.100.85:5000/api/auth/register/user", formData);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onRegister && onRegister(res.data.user); // App.jsx user state-ni yangilash
      }

      navigate("/"); // Home yoki Profile
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-3xl"></div>

          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-white/70 mt-2">Join us and start your journey</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 p-3 mb-6 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-200">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* First Name */}
            <div className="group relative">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="group relative">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group relative">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group relative">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-xl transition-all duration-300 group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-purple-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-6 py-3 flex items-center justify-center gap-2 text-white font-semibold">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/60 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 blur-xl rounded-full"></div>
      </div>
    </div>
  );
};

export default Register;
