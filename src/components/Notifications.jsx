






// components/Notifications.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiInfo, FiCheckCircle, FiAlertTriangle, FiX, FiSettings, FiFilter } from 'react-icons/fi';

function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mock data
  const notificationData = [
    {
      id: 1,
      type: 'info',
      title: 'System Update',
      message: 'WorkSync will be updated to version 2.1 tonight at 2 AM.',
      time: '10 minutes ago',
      read: false,
      category: 'system'
    },
    {
      id: 2,
      type: 'success',
      title: 'Task Completed',
      message: 'You completed the "Q3 Marketing Strategy" task.',
      time: '2 hours ago',
      read: false,
      category: 'task'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Task Due Soon',
      message: '"Website Redesign" task is due tomorrow at 5 PM.',
      time: '5 hours ago',
      read: true,
      category: 'reminder'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Message',
      message: 'Sarah Brown sent you a message regarding the design project.',
      time: '1 day ago',
      read: true,
      category: 'message'
    },
    {
      id: 5,
      type: 'success',
      title: 'Project Milestone',
      message: 'Q3 goals have been achieved! Team performance exceeded expectations.',
      time: '2 days ago',
      read: true,
      category: 'project'
    },
    {
      id: 6,
      type: 'warning',
      title: 'Meeting Reminder',
      message: 'Team standup meeting in 30 minutes. Please prepare your updates.',
      time: '2 days ago',
      read: false,
      category: 'reminder'
    }
  ];
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(notificationData);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getIcon = (type) => {
    switch(type) {
      case 'info': return <FiInfo className="w-5 h-5 text-blue-500" />;
      case 'success': return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <FiAlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <FiBell className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getBgColor = (type, read) => {
    if (read) return 'bg-white';
    
    switch(type) {
      case 'info': return 'bg-blue-50';
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-amber-50';
      default: return 'bg-white';
    }
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.category === activeTab;
  });
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'All', icon: <FiBell /> },
    { id: 'unread', label: 'Unread', icon: <FiBell /> },
    { id: 'system', label: 'System', icon: <FiBell /> },
    { id: 'task', label: 'Tasks', icon: <FiBell /> },
    { id: 'reminder', label: 'Reminders', icon: <FiBell /> },
    { id: 'message', label: 'Messages', icon: <FiBell /> },
    { id: 'project', label: 'Projects', icon: <FiBell /> }
  ];
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiBell className="text-white h-6 w-6" />
            <h1 className="text-xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Filter notifications"
            >
              <FiFilter className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Settings"
            >
              <FiSettings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Filter Tags */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 p-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1
                      ${activeTab === category.id 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notifications List */}
        {isLoading ? (
          // Loading State
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          // Empty State
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full">
              <FiBell className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No notifications</h3>
            <p className="mt-2 text-gray-500">
              {activeTab === 'all' 
                ? "You don't have any notifications yet" 
                : `No ${activeTab === 'unread' ? 'unread' : activeTab} notifications found`}
            </p>
          </div>
        ) : (
          // Notifications
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className={`${getBgColor(notification.type, notification.read)} p-5 relative`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${notification.type === 'info' ? 'bg-blue-100' : 
                        notification.type === 'success' ? 'bg-green-100' : 
                        'bg-amber-100'}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    
                    <p className={`mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="mt-2 flex justify-between">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {notification.category}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        {notifications.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg"
              onClick={markAllAsRead}
            >
              Mark all as read
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Notifications;