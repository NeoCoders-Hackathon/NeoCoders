import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Package, ShoppingCart, User, AlertCircle } from 'lucide-react';

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Sample notifications - in real app, this would come from API
    const sampleNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'Order Confirmed',
        message: 'Your order #12345 has been confirmed and is being processed.',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        icon: ShoppingCart
      },
      {
        id: 2,
        type: 'product',
        title: 'New Product Added',
        message: 'Check out our latest iPhone 15 Pro Max now available!',
        time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: true,
        icon: Package
      },
      {
        id: 3,
        type: 'account',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        icon: User
      },
      {
        id: 4,
        type: 'alert',
        title: 'Security Alert',
        message: 'New login detected from Chrome on Windows.',
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        icon: AlertCircle
      }
    ];
    
    setNotifications(sampleNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-600';
      case 'product': return 'bg-green-100 text-green-600';
      case 'account': return 'bg-purple-100 text-purple-600';
      case 'alert': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br  p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-300">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option  className='bg-gray-950 text-white' value="all">All</option>
              <option className='bg-gray-950 text-white' value="unread">Unread</option>
              <option  className='bg-gray-950 text-white'value="order">Orders</option>
              <option className='bg-gray-950 text-white' value="product">Products</option>
              <option className='bg-gray-950 text-white' value="account">Account</option>
              <option className='bg-gray-950 text-white' value="alert">Alerts</option>
            </select>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You're all caught up! No notifications to show." 
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-gray-800  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${
                    !notification.read ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${getTypeColor(notification.type)}`}>
                      <IconComponent className="w-6 h-6 " />
                    </div>
                    
                    <div className="flex-1 ">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-300' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300">
                            {getTimeAgo(notification.time)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{notification.message}</p>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            <Check className="w-4 h-4" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;