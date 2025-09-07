import React, { useState, useEffect } from "react";
import { Home, User, Bell, Heart, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserImage } from "../utils/getUserImage";

const Sidebar = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'User';
  const userEmail = user?.email || '';
  const userImage = getUserImage(user);

  const menuItems = [
    { id: "home", name: "Home", icon: Home, path: "/" },
    { id: "profile", name: "Profile", icon: User, path: "/profile" },
    { id: "products", name: "Products", icon: ShoppingCart, path: "/products" },
    { id: "notifications", name: "Notifications", icon: Bell, path: "/notifications" },
    { id: "favorites", name: "Favorites", icon: Heart, path: "/favorites" },
    { id: "orders", name: "Orders", icon: ShoppingCart, path: "/orders" },
  ];

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {isOpen && window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed md:relative left-0 top-0 h-screen z-50 bg-gradient-to-b from-[#1e1e3f] to-[#2b2b55] text-white shadow-2xl border-r border-violet-500/20 transition-all duration-300 ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-16 -translate-x-full md:translate-x-0"}`}>
        <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">NeoShop</h1>}
          <button onClick={()=>setIsOpen(!isOpen)}>{isOpen ? <X/> : <Menu/>}</button>
        </div>

        {isOpen && (
          <div className="p-4 border-b border-violet-500/20 flex items-center gap-3">
            <img src={userImage} alt="Profile" className="w-10 h-10 rounded-full border-2 border-violet-500/50"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-xs text-gray-300 truncate">{userEmail}</p>
              <span className="inline-block mt-1 bg-violet-600/30 px-2 py-0.5 rounded-full text-xs text-violet-300">{user?.role || 'User'}</span>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item=>{
            const Icon=item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button key={item.id} onClick={()=>handleNavigation(item.path)} className={`w-full flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-violet-600/20'}`}>
                <Icon className="w-5 h-5"/>
                {isOpen && <span>{item.name}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-violet-500/20">
          <button onClick={()=>onLogout()} className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20`}>
            <LogOut className="w-5 h-5"/>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
