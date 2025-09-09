import React, { useState, useEffect } from "react";
import { Home, User, Bell, Heart, ShoppingCart, Menu, X, LogOut, Settings, Package, BarChart3, Store } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserImage } from "../utils/getUserImage";

const Sidebar = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'User';
  const userEmail = user?.email || '';
  const userImage = getUserImage(user);

  const isAdmin = user?.role === 'admin';

  const adminMenuItems = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3, path: "/" },
    { id: "products", name: "Products", icon: Package, path: "/products" },
    { id: "orders", name: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "notifications", name: "Notifications", icon: Bell, path: "/notifications" },
    { id: "profile", name: "Profile", icon: User, path: "/profile" },
  ];

  const userMenuItems = [
    { id: "shop", name: "Shop", icon: Store, path: "/" },
    { id: "favorites", name: "Favorites", icon: Heart, path: "/favorites" },
    { id: "orders", name: "My Orders", icon: ShoppingCart, path: "/orders" },
    { id: "notifications", name: "Notifications", icon: Bell, path: "/notifications" },
    { id: "profile", name: "Profile", icon: User, path: "/profile" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

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

      <div className={`h-screen md:relative z-50 bg-gradient-to-b 
  from-[#1e1e3f] to-[#2b2b55] text-white shadow-2xl 
  border-r border-violet-500/20 transition-all duration-300 
  ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-16 -translate-x-full md:translate-x-0"} from-[#1e1e3f] to-[#2b2b55] text-white shadow-2xl border-r border-violet-500/20 transition-all duration-300 ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-16 -translate-x-full md:translate-x-0"}`}>
        <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">NeoShop</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
        </div>

        {isOpen && (
          <div className="p-4 border-b border-violet-500/20 flex items-center gap-3">
            <img src={userImage} alt="Profile" className="w-10 h-10 rounded-full border-2 border-violet-500/50" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-xs text-gray-300 truncate">{userEmail}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${isAdmin ? 'bg-red-600/30 text-red-300' : 'bg-violet-600/30 text-violet-300'}`}>
                {isAdmin ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        )}

        <nav
          className={` p-4 space-y-2 transition-all duration-300 
  ${isOpen ? "overflow-y-auto" : "overflow-hidden"}`}
        >
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center rounded-lg p-3 transition-colors 
        ${isOpen ? " gap-3 w-full" : "w-12 h-12 "} 
        ${isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-violet-600/20"
                  }`}
              >
                <Icon className="w-6 h-6" />
                {isOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>


        <div className="p-4 border-t border-violet-500/20">
          <button
            onClick={() => onLogout()}
            className={`flex items-center rounded-lg text-red-400 transition-colors
      ${isOpen
                ? "gap-3 justify-start w-full p-3 hover:text-red-300 hover:bg-red-600/20"
                : "w-12 h-12  hover:text-red-300"
              }
    `}
          >
            <LogOut className="w-6 h-6" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>



      </div>
    </>
  )
}

export default Sidebar;
