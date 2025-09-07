import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) console.log('Searching for:', searchTerm);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      setIsDropdownOpen(false);
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleHomeClick = () => navigate('/');

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
        <div className="flex-1">
          <button 
            onClick={handleHomeClick}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-300 hover:to-purple-300 transition-all duration-200"
          >
            NeoCoders
          </button>
        </div>

        <div className="flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#3a3a65]/80 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 hover:bg-violet-600/20 rounded-lg transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1e1e3f] animate-pulse"></span>
            </button>
          </div>

          <button 
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-violet-600/20 rounded-lg transition-colors duration-200"
          >
            <Settings className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>

          <div className="relative dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 hover:bg-violet-600/20 rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-violet-500/50 shadow-md">
                <img
                  src={user?.image || `https://via.placeholder.com/150/6366f1/ffffff?text=${user?.name?.charAt(0) || 'U'}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-300">{user?.email || ''}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-[#2b2b55] to-[#3a3a65] border border-violet-500/30 rounded-lg shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-purple-600/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-violet-500/50">
                      <img
                        src={user?.image || `https://via.placeholder.com/150/6366f1/ffffff?text=${user?.name?.charAt(0) || 'U'}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-300">{user?.email || ''}</p>
                      <span className="inline-block mt-1 bg-violet-600/30 px-2 py-1 rounded-full text-xs text-violet-300">
                        {user?.role || 'User'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-600/20 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-600/20 transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <div className="border-t border-violet-500/20 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
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
