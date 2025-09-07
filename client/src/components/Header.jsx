import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserImage } from '../utils/getUserImage';

const Header = ({ onLogout, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'User';
  const userEmail = user?.email || '';
  const userImage = getUserImage(user);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="bg-gradient-to-r from-[#1e1e3f] to-[#2b2b55] text-white shadow-lg border-b border-violet-500/20 px-6 py-4 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">NeoShop</button>

        <div className="flex-1 max-w-md mx-6">
          <form onSubmit={(e)=>e.preventDefault()} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#3a3a65]/80 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-300" />
          <Settings onClick={()=>navigate('/settings')} className="w-5 h-5 text-gray-300 cursor-pointer" />

          <div className="relative dropdown-container">
            <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 p-2 hover:bg-violet-600/20 rounded-lg">
              <img src={userImage} alt="Profile" className="w-8 h-8 rounded-full border-2 border-violet-500/50" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white truncate">{userName}</p>
                <p className="text-xs text-gray-300 truncate">{userEmail}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-[#2b2b55] to-[#3a3a65] border border-violet-500/30 rounded-lg shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-violet-500/20 flex items-center gap-3">
                  <img src={userImage} alt="Profile" className="w-12 h-12 rounded-full border-2 border-violet-500/50" />
                  <div>
                    <p className="font-semibold text-white">{userName}</p>
                    <p className="text-xs text-gray-300">{userEmail}</p>
                    <span className="inline-block mt-1 bg-violet-600/30 px-2 py-1 rounded-full text-xs text-violet-300">{user?.role || 'User'}</span>
                  </div>
                </div>
                <div className="py-2">
                  <button onClick={()=>{setIsDropdownOpen(false); navigate('/profile')}} className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-600/20">View Profile</button>
                  <button onClick={()=>{setIsDropdownOpen(false); navigate('/settings')}} className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-600/20">Settings</button>
                  <div className="border-t border-violet-500/20 mt-2 pt-2">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10">Logout</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
