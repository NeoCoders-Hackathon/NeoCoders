import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Notifications from "./pages/Notifications";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loading from './components/Loading';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); // 0.3s loading
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/products" element={<Products user={user} />} />
              <Route path="/notifications" element={<Notifications user={user} />} />
              <Route path="/favorites" element={<Favorites user={user} />} />
              <Route path="/orders" element={<Orders user={user} />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
