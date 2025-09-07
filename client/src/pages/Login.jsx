import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('No registered user found');
      return;
    }
    if (formData.email === storedUser.email && formData.password === storedUser.password) {
      navigate('/', { state: { user: storedUser } });
    } else {
      setError('Email or password is incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-violet-800 p-4">
      <div className="max-w-md w-full bg-[#1e1e3f] p-6 rounded-2xl shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="flex items-center gap-2 bg-red-600/20 p-3 mb-4 rounded">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full pl-10 p-2 rounded bg-[#3a3a65] text-white"/>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400"/>
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-10 pr-10 p-2 rounded bg-[#3a3a65] text-white"/>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff/> : <Eye/>}</button>
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white font-semibold">Login</button>
        </form>
        <p className="text-sm mt-4 text-center">
          No account?{' '}
          <button onClick={() => navigate('/register')} className="text-violet-400 underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
