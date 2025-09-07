import React, { useState } from 'react';
import { User, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({ name:'', email:'', password:'', confirmPassword:'' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    if(error) setError('');
  };

  const validate = () => {
    if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword) { setError('All fields required'); return false; }
    if(formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return false; }
    if(formData.password.length < 6) { setError('Password must be at least 6 chars'); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) { setError('Invalid email'); return false; }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) return;

    setIsLoading(true);
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if(users.some(u => u.email === formData.email)){
      setError('Email already used'); 
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'user',
      createdAt: new Date().toISOString(),
      image: `https://via.placeholder.com/150/6366f1/ffffff?text=${formData.name.charAt(0).toUpperCase()}`
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    onRegister(newUser); // <-- avtomatik login
    navigate('/');        // <-- Home sahifaga yo‘naltirish
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#1e1e3f] rounded-2xl shadow-2xl text-white mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <div className="flex items-center gap-2 bg-red-600/20 p-3 mb-4 rounded text-red-300"><AlertCircle className="w-5 h-5"/>{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full pl-11 pr-4 py-2 rounded bg-[#3a3a65] text-white"/>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-11 pr-4 py-2 rounded bg-[#3a3a65] text-white"/>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
          <input type={showPassword?'text':'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-11 pr-11 py-2 rounded bg-[#3a3a65] text-white"/>
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword?<EyeOff/>:<Eye/>}</button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
          <input type={showPassword?'text':'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full pl-11 pr-11 py-2 rounded bg-[#3a3a65] text-white"/>
        </div>

        <button type="submit" disabled={isLoading} className="w-full py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white font-semibold">{isLoading?'Processing...':'Register'}</button>
      </form>
    </div>
  );
};

export default Register;
