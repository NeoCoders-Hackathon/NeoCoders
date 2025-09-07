import React, { useState, useEffect } from "react";
import { Home, User, Bell, Heart, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", name: "Home", icon: Home, path: "/" },
    { id: "profile", name: "Profile", icon: User, path: "/profile" },
    { id: "products", name: "Products", icon: ShoppingCart, path: "/products" },
    { id: "notifications", name: "Notifications", icon: Bell, path: "/notifications" },
    { id: "favorites", name: "Favorites", icon: Heart, path: "/favorites" },
    { id: "orders", name: "Orders", icon: ShoppingCart, path: "/orders" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) onLogout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative left-0 top-0 h-screen z-50
          bg-gradient-to-b from-[#1e1e3f] to-[#2b2b55]
          text-white shadow-2xl border-r border-violet-500/20
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-16 -translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                NeoCoders
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-violet-600/20 rounded-lg transition-colors duration-200 group"
          >
            {isOpen ? <X className="w-5 h-5 text-gray-300 group-hover:text-white" /> : <Menu className="w-5 h-5 text-gray-300 group-hover:text-white" />}
          </button>
        </div>

        {/* User Info */}
        {isOpen && (
          <div className="p-4 border-b border-violet-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/50">
                <img
                  src={user?.image || `https://via.placeholder.com/150/6366f1/ffffff?text=${user?.name?.charAt(0) || "U"}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150/6366f1/ffffff?text=${user?.name?.charAt(0) || "U"}`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
                <p className="text-xs text-gray-300 truncate">{user?.email || ""}</p>
                <span className="inline-block mt-1 bg-violet-600/30 px-2 py-0.5 rounded-full text-xs text-violet-300">
                  {user?.role || "User"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-300 hover:text-white hover:bg-violet-600/20 hover:scale-105"}
                  ${!isOpen && "justify-center"}
                `}
                title={!isOpen ? item.name : ""}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                {isOpen && <span className="flex-1 text-left">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-violet-500/20">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-600/20 hover:scale-105 ${!isOpen && "justify-center"}`}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed top-4 left-4 z-40 md:hidden p-3
          bg-gradient-to-br from-violet-600 to-purple-600
          text-white rounded-lg shadow-lg
          transition-all duration-200 hover:scale-110
          ${isOpen ? "hidden" : "block"}
        `}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default Sidebar;
