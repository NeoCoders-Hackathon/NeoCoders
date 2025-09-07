import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, Users, Star } from 'lucide-react';

const Home = () => {
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user?.firstName || 'User'}!
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded-xl flex items-center gap-4">
          <ShoppingCart className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="font-bold text-xl">120</h2>
            <p>Orders</p>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl flex items-center gap-4">
          <Users className="w-6 h-6 text-green-400" />
          <div>
            <h2 className="font-bold text-xl">80</h2>
            <p>Customers</p>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-xl flex items-center gap-4">
          <Star className="w-6 h-6 text-yellow-400" />
          <div>
            <h2 className="font-bold text-xl">4.5</h2>
            <p>Rating</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition">Add Product</button>
        <button className="p-4 bg-green-600 rounded-xl hover:bg-green-700 transition">View Orders</button>
        <button className="p-4 bg-yellow-600 rounded-xl hover:bg-yellow-700 transition">Customers</button>
      </div>
    </div>
  );
};

export default Home;
