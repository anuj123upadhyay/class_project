






// components/Profile.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiCheckCircle, FiClock } from 'react-icons/fi';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample user data
  const user = {
    name: 'John Doe',
    role: 'Senior Product Designer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    cover: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    details: {
      email: 'john.doe@worksync.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joined: 'January 2022',
    },
    stats: {
      completedTasks: 284,
      pendingTasks: 12,
      projects: 8,
    },
    skills: ['UI/UX Design', 'Prototyping', 'User Research', 'Figma', 'Adobe XD'],
    recentActivity: [
      { id: 1, action: 'Completed task', item: 'Homepage Redesign', time: '2 hours ago', completed: true },
      { id: 2, action: 'Started task', item: 'User Interview Analysis', time: '5 hours ago', completed: false },
      { id: 3, action: 'Commented on', item: 'Mobile App Wireframes', time: '1 day ago', completed: true },
    ],
    currentProjects: [
      { id: 1, name: 'WorkSync Dashboard', progress: 75, color: 'from-blue-500 to-indigo-600' },
      { id: 2, name: 'Mobile App Redesign', progress: 45, color: 'from-emerald-500 to-teal-600' },
      { id: 3, name: 'Brand Guidelines', progress: 90, color: 'from-purple-500 to-pink-600' },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Cover & Profile Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${user.cover})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 flex items-end px-8 py-6 text-white">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mr-6"
          >
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </motion.div>
          
          <div className="pb-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-white/80">{user.role}</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto mb-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
      
      {/* Profile Navigation */}
      <div className="flex px-8 border-b bg-white shadow">
        {['overview', 'tasks', 'projects', 'files', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === tab 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Info Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiMail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.details.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiPhone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.details.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiMapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{user.details.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{user.details.joined}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiBriefcase className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">Design Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Skills */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="text-4xl font-bold">{user.stats.completedTasks}</h3>
                <p className="mt-2 text-blue-100">Completed Tasks</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                <h3 className="text-4xl font-bold">{user.stats.pendingTasks}</h3>
                <p className="mt-2 text-emerald-100">Pending Tasks</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <h3 className="text-4xl font-bold">{user.stats.projects}</h3>
                <p className="mt-2 text-purple-100">Active Projects</p>
              </div>
            </motion.div>
            
            {/* Current Projects */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4">Current Projects</h2>
              <div className="space-y-5">
                {user.currentProjects.map(project => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className="text-sm text-gray-500">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-6">
                {user.recentActivity.map(activity => (
                  <div key={activity.id} className="flex">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      activity.completed ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      {activity.completed ? (
                        <FiCheckCircle className="text-green-600" />
                      ) : (
                        <FiClock className="text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{activity.action}</span>
                        {' '}<span className="text-indigo-600">{activity.item}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;