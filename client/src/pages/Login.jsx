import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Github } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ navigate ishlashi uchun
// Dizayn buzilmagan

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // ✅ navigate endi ishlaydi
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://192.168.100.85:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
        navigate("/profile"); // ✅ login bo‘lgach profilga o‘tadi
      }

      console.log("Login successful");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login initiated");
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative">
      {/* Orqa fon blur elementlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-700/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-700/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
        </div>
      </div>

      <div className="relative max-w-6xl w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex overflow-hidden">
        {/* Left Side - Branding/Image */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 to-violet-800 items-center justify-center p-12">
          <div className="text-center text-white z-10">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  N
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                NeoShop
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Your premium shopping experience awaits. Join thousands of satisfied customers.
              </p>
            </div>
            <div className="space-y-4 text-purple-100">
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Secure & Fast Checkout</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Premium Quality Products</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 text-white">
                Welcome Back
              </h2>
              <p className="text-gray-300">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 p-4 mb-6 rounded-xl text-red-300 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  required
                />
              </div>

              {/* Password input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>
                <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Social login */}
            <div className="my-8 flex items-center justify-center gap-4 text-gray-400">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              <span className="text-sm font-medium">OR</span>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all transform hover:scale-[1.02] text-white font-medium backdrop-blur-sm group"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all transform hover:scale-[1.02] text-white font-medium backdrop-blur-sm group"
              >
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Link to Register */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")} // ✅ endi ishlaydi
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
