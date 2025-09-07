import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register/user', formData);
      const { token, user } = res.data;

      // Token va foydalanuvchi ma'lumotini localStorage ga saqlaymiz
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // App.jsx da state ni yangilash
      onRegister(user);

      navigate('/'); // Registerdan keyin Home ga o'tish
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else setError('Server error. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-violet-800 p-4">
      <div className="max-w-md w-full bg-[#1e1e3f] p-6 rounded-2xl shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="flex items-center gap-2 bg-red-600/20 p-3 mb-4 rounded"><AlertCircle className="w-5 h-5"/> {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full pl-10 p-2 rounded bg-[#3a3a65] text-white"/>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full pl-10 p-2 rounded bg-[#3a3a65] text-white"/>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-10 p-2 rounded bg-[#3a3a65] text-white"/>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-10 pr-10 p-2 rounded bg-[#3a3a65] text-white"/>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff/> : <Eye/>}</button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-10 pr-10 p-2 rounded bg-[#3a3a65] text-white"/>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white font-semibold">
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account? <button onClick={()=>navigate('/login')} className="text-violet-400 underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
