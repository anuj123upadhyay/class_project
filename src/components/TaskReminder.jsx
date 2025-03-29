










// components/TaskReminder.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, FiCalendar, FiStar, FiCheck, FiPlus, 
  FiFilter, FiAlertCircle, FiEdit, FiTrash2, FiChevronDown 
} from 'react-icons/fi';

function TaskReminder() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', priority: 'medium' });
  
  // Mock data
  const mockTasks = [
    {
      id: 1,
      title: 'Complete Q3 Financial Report',
      date: '2023-10-12T14:00:00',
      priority: 'high',
      completed: false,
      category: 'work',
      description: 'Compile and analyze Q3 financial data for board meeting.'
    },
    {
      id: 2,
      title: 'Weekly Team Meeting',
      date: '2023-10-15T10:00:00',
      priority: 'medium',
      completed: false,
      category: 'meeting',
      description: 'Discuss project progress and address team concerns.'
    },
    {
      id: 3,
      title: 'Review Marketing Strategy',
      date: '2023-10-20T13:30:00',
      priority: 'medium',
      completed: false,
      category: 'work',
      description: 'Evaluate current marketing campaigns and adjust strategy.'
    },
    {
      id: 4,
      title: 'Client Presentation Preparation',
      date: '2023-10-11T09:00:00',
      priority: 'high',
      completed: false,
      category: 'work',
      description: 'Prepare slides and talking points for client meeting.'
    },
    {
      id: 5,
      title: 'Quarterly OKR Review',
      date: '2023-10-25T15:00:00',
      priority: 'medium',
      completed: false,
      category: 'meeting',
      description: 'Review objectives and key results with management.'
    },
    {
      id: 6,
      title: 'Update Website Content',
      date: '2023-11-01T00:00:00',
      priority: 'low',
      completed: true,
      category: 'work',
      description: 'Update product descriptions and add new testimonials.'
    }
  ];
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const isUpcoming = (dateString) => {
    const taskDate = new Date(dateString);
    const now = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(now.getDate() + 5);
    
    return taskDate > now && taskDate <= twoDaysFromNow;
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleAddTask = () => {
    if (!newTask.title || !newTask.date) return;
    
    const task = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date,
      priority: newTask.priority,
      completed: false,
      category: 'work',
      description: ''
    };
    
    setTasks([task, ...tasks]);
    setNewTask({ title: '', date: '', priority: 'medium' });
    setIsAddingTask(false);
  };
  
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const today = new Date();
    
    switch (filter) {
      case 'all':
        return true;
      case 'today':
        return taskDate.toDateString() === today.toDateString();
      case 'upcoming':
        return isUpcoming(task.date) && !task.completed;
      case 'completed':
        return task.completed;
      case 'high':
        return task.priority === 'high' && !task.completed;
      default:
        return true;
    }
  });
  
  // Group tasks by date for better organization
  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const date = new Date(task.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});
  
  // Sort dates
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => 
    new Date(a) - new Date(b)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Task Reminders</h1>
          <p className="text-gray-600 mt-1">
            Keep track of your upcoming tasks and deadlines
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingTask(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center font-medium"
        >
          <FiPlus className="mr-2" /> Add Reminder
        </motion.button>
      </motion.div>
      
      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        {['all', 'today', 'upcoming', 'high', 'completed'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
              filter === filterOption 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filterOption === 'all' && <FiFilter className="mr-1.5" />}
            {filterOption === 'today' && <FiCalendar className="mr-1.5" />}
            {filterOption === 'upcoming' && <FiClock className="mr-1.5" />}
            {filterOption === 'high' && <FiAlertCircle className="mr-1.5" />}
            {filterOption === 'completed' && <FiCheck className="mr-1.5" />}
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </motion.div>
      
      {/* Tasks */}
      <div className="space-y-6">
        {isLoading ? (
          // Loading state
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow p-8 flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your tasks...</p>
          </motion.div>
        ) : sortedDates.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow p-12 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <FiCalendar className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No tasks found</h3>
            <p className="mt-2 text-gray-500 max-w-md">
              {filter === 'all' 
                ? "You don't have any tasks yet. Create your first task to get started." 
                : `No tasks in the "${filter}" category.`}
            </p>
            <button
              onClick={() => setIsAddingTask(true)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center font-medium"
            >
              <FiPlus className="mr-2" /> Add New Task
            </button>
          </motion.div>
        ) : (
          // Task groups by date
          sortedDates.map((date) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h3 className="text-md font-medium text-gray-500 pl-4">
                {new Date(date).toDateString() === new Date().toDateString() 
                  ? 'Today' 
                  : new Date(date).toDateString() === new Date(Date.now() + 86400000).toDateString()
                    ? 'Tomorrow'
                    : new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              
              <div className="bg-white rounded-2xl shadow overflow-hidden">
                {groupedTasks[date].map((task, index) => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    toggleCompletion={toggleTaskCompletion} 
                    deleteTask={deleteTask}
                    isLast={index === groupedTasks[date].length - 1} 
                  />
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  Add Task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Task Item Component
function TaskItem({ task, toggleCompletion, deleteTask, isLast }) {
  const [expanded, setExpanded] = useState(false);
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  const formattedTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  return (
    <div className={`${isLast ? '' : 'border-b border-gray-100'}`}>
      <div className="px-6 py-4 flex items-start">
        <button
          onClick={() => toggleCompletion(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-1
            ${task.completed ? 
              'bg-indigo-600 border-indigo-600' : 
              'border-gray-300 hover:border-indigo-500'}`}
        >
          {task.completed && <FiCheck className="text-white" />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <FiClock className="mr-1.5" />
            {formattedTime(task.date)}
          </div>
          
          {task.description && (
            <div className="mt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-xs text-indigo-600 hover:text-indigo-800"
              >
                <span>{expanded ? 'Hide details' : 'Show details'}</span>
                <FiChevronDown className={`ml-1 transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-sm text-gray-600">
                      {task.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button 
            className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Edit task"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
            title="Delete task"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskReminder;