// components/Logout.jsx
import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
