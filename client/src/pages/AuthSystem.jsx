import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthSystem = () => {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    console.log("User registered:", userData);
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center text-white border border-white/20">
          <h2 className="text-3xl font-bold mb-4">Welcome, {user.firstName || user.name}!</h2>
          <p className="text-gray-300 mb-6">
            You have successfully {currentView === "login" ? "logged in" : "registered"}.
          </p>
          <button 
            onClick={() => setUser(null)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return currentView === "login" ? (
    <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView("register")} />
  ) : (
    <Register onRegister={handleRegister} onSwitchToLogin={() => setCurrentView("login")} />
  );
};

export default AuthSystem;
