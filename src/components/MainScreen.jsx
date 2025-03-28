// components/MainScreen.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiClock, FiCheckCircle, FiBell, FiStar } from 'react-icons/fi';

function MainScreen({ activeComponent, setActiveComponent }) {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const cards = [
    { 
      id: 'tasks', 
      title: 'Task Reminders', 
      description: 'Manage your upcoming tasks', 
      icon: <FiClock className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      count: 5
    },
    { 
      id: 'todo', 
      title: 'To-Do List', 
      description: 'Track your daily to-dos', 
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      count: 12
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      description: 'Stay updated with alerts', 
      icon: <FiBell className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      count: 3
    },
    { 
      id: 'profile', 
      title: 'Your Profile', 
      description: 'View and edit your profile', 
      icon: <FiStar className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      count: null
    }
  ];

  return (
    <div className="py-6 px-4 md:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">{greeting}, John</h1>
        <p className="text-gray-500 mt-1">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })} | {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </p>
      </motion.div>
      
      {/* Dashboard Overview */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map(card => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              transition: { type: "spring", stiffness: 300 }
            }}
            onClick={() => setActiveComponent(card.id)}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-6 text-white shadow-lg cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div className="bg-white/20 rounded-lg p-3">
                {card.icon}
              </div>
              {card.count !== null && (
                <span className="bg-white text-indigo-600 font-bold rounded-full w-7 h-7 flex items-center justify-center">
                  {card.count}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold mt-4">{card.title}</h2>
            <p className="text-white/80 mt-1">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {[1, 2, 3].map(item => (
            <div key={item} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <FiClock className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">Task #{item} updated</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(Date.now() - item * 3600000).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

MainScreen.propTypes = {
  activeComponent: PropTypes.string.isRequired,
  setActiveComponent: PropTypes.func.isRequired
};

export default MainScreen;