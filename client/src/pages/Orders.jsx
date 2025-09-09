import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Get orders from localStorage (in real app, this would be from API)
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-300">
              {user?.role === 'admin' ? 'All Orders' : 'My Orders'}
            </h1>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {filteredOrders.length} orders
            </span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option className='bg-gray-950 text-gray-350' value="pending">Pending</option>
            <option className='bg-gray-950 text-gray-350' value="processing">Processing</option>
            <option className='bg-gray-950 text-gray-350' value="completed">Completed</option>
            <option className='bg-gray-950 text-gray-350' value="cancelled">Cancelled</option>
            <option className='bg-gray-950 text-gray-350'  value="all">All Orders</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't placed any orders yet" 
                : `No ${filter} orders found`
              }
            </p>
            {user?.role !== 'admin' && (
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.total || '0.00'}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {user?.role === 'admin' && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Customer:</span> {order.customerName || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {order.customerEmail || 'N/A'}
                      </p>
                    </div>
                  )}
                  
                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                              {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                            </div>
                            <p className="font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-500 text-center py-2">
                            +{order.items.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;