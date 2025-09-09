import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  UserPlus,
  Phone,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer", // default customer
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 inputlarni o‘zgartirish
  const handleChange = (e) => {
    let { name, value } = e.target;

    // Email yozilganda role avtomatik aniqlanadi
    if (name === "email") {
      if (value.startsWith("admin1")) {
        setFormData({ ...formData, email: value, role: "admin" });
      } else {
        setFormData({ ...formData, email: value, role: "customer" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (error) setError("");
  };

  // 🔹 submit qilish
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://192.168.100.85:5000/api/auth/register/user",
        formData
      );

      if (res.data.user) {
        onRegister && onRegister(res.data.user);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/30 rounded-full filter blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10 border border-white/20">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-400/50">
            <UserPlus className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Join us and start your journey
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-4 border border-red-500/30">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* First Name */}
          <div className="group relative">
            <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15"
            />
          </div>

          {/* Last Name */}
          <div className="group relative">
            <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15"
            />
          </div>

          {/* Email */}
          <div className="group relative">
            <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15"
            />
          </div>

          {/* Phone */}
          <div className="group relative">
            <Phone className="absolute left-3 top-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15"
            />
          </div>

          {/* Password */}
          <div className="group relative">
            <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-purple-400 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
