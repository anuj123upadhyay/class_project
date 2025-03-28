






// components/TodoList.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckSquare, FiSquare, FiPlus, FiTrash2, 
  FiEdit, FiCalendar, FiTag, FiClock, FiFilter,
  FiArchive, FiX, FiSave, FiStar
} from 'react-icons/fi';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categories for organization
  const categories = [
    { id: 'personal', name: 'Personal', color: 'bg-purple-500' },
    { id: 'work', name: 'Work', color: 'bg-blue-500' },
    { id: 'shopping', name: 'Shopping', color: 'bg-green-500' },
    { id: 'health', name: 'Health', color: 'bg-red-500' },
    { id: 'finance', name: 'Finance', color: 'bg-amber-500' },
  ];

  // Mock data
  const mockTodos = [
    { 
      id: 1, 
      text: 'Finalize project proposal', 
      completed: false, 
      date: new Date().toISOString(), 
      category: 'work',
      important: true,
    },
    { 
      id: 2, 
      text: 'Schedule dentist appointment', 
      completed: false, 
      date: new Date().toISOString(),
      category: 'health',
      important: false,
    },
    { 
      id: 3, 
      text: 'Buy groceries for the week', 
      completed: true, 
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'shopping',
      important: false,
    },
    { 
      id: 4, 
      text: 'Pay monthly bills', 
      completed: false, 
      date: new Date(Date.now() - 172800000).toISOString(),
      category: 'finance',
      important: true,
    },
    { 
      id: 5, 
      text: 'Prepare presentation slides', 
      completed: false, 
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'work',
      important: true,
    },
    { 
      id: 6, 
      text: 'Call mom on her birthday', 
      completed: false, 
      date: new Date(Date.now() + 172800000).toISOString(),
      category: 'personal',
      important: true,
    },
  ];
  
  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTodos(mockTodos);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      date: new Date().toISOString(),
      category: 'personal',
      important: false,
    };
    
    setTodos([todo, ...todos]);
    setNewTodo('');
  };
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Start editing a todo
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  // Save edited todo
  const saveEdit = () => {
    if (!editText.trim()) return;
    
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };
  
  // Toggle important flag
  const toggleImportant = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };
  
  // Change todo category
  const changeCategory = (id, category) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, category } : todo
    ));
  };
  
  // Filter todos based on active filter and search query
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeFilter) {
      case 'all':
        return matchesSearch;
      case 'active':
        return !todo.completed && matchesSearch;
      case 'completed':
        return todo.completed && matchesSearch;
      case 'important':
        return todo.important && matchesSearch;
      default:
        return todo.category === activeFilter && matchesSearch;
    }
  });
  
  // Format date relative to today
  const formatDate = (dateString) => {
    const todoDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (todoDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (todoDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (todoDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return todoDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">To-Do List</h1>
        <p className="text-gray-600 mt-1">Track your tasks and stay organized</p>
      </motion.div>
      
      {/* Add Todo Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={addTodo}
        className="bg-white rounded-xl shadow-md overflow-hidden mb-8 flex"
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-6 py-4 focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 font-medium flex items-center"
        >
          <FiPlus className="mr-2" /> Add
        </button>
      </motion.form>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiFilter className="inline mr-1.5" /> All
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeFilter === 'active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiSquare className="inline mr-1.5" /> Active
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeFilter === 'completed'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiCheckSquare className="inline mr-1.5" /> Completed
          </button>
          <button
            onClick={() => setActiveFilter('important')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeFilter === 'important'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiStar className="inline mr-1.5" /> Important
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                activeFilter === category.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${category.color} mr-2`}></span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <svg
          className="absolute left-4 top-3.5 text-gray-400 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </motion.div>
      
      {/* Todo List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow p-8 flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your tasks...</p>
          </motion.div>
        ) : filteredTodos.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow p-12 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <FiCheckSquare className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No tasks found</h3>
            <p className="mt-2 text-gray-500 max-w-md">
              {todos.length === 0
                ? "You don't have any tasks yet. Add your first task to get started."
                : `No tasks match your current filter${searchQuery ? ' and search' : ''}.`}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-gray-100 last:border-0"
                >
                  <div className="px-6 py-4 flex items-start">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0 mt-1 mr-4"
                    >
                      {todo.completed ? (
                        <FiCheckSquare className="w-6 h-6 text-indigo-600" />
                      ) : (
                        <FiSquare className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
                      )}
                    </button>
                    
                    {/* Todo Content */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={saveEdit}
                            className="ml-2 p-2 text-indigo-600 hover:bg-indigo-100 rounded-md"
                          >
                            <FiSave className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="ml-1 p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {todo.text}
                            </h3>
                            {todo.important && (
                              <FiStar className="ml-2 w-4 h-4 text-amber-400" />
                            )}
                          </div>
                          
                          <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <FiCalendar className="mr-1.5" />
                              {formatDate(todo.date)}
                            </div>
                            <div className="flex items-center">
                              <FiTag className="mr-1.5" />
                              <span className={`inline-flex items-center ${
                                categories.find(c => c.id === todo.category)?.color.replace('bg-', 'text-')
                              }`}>
                                {categories.find(c => c.id === todo.category)?.name}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Actions */}
                    {editingId !== todo.id && (
                      <div className="flex items-center space-x-1 ml-4">
                        <button
                          onClick={() => toggleImportant(todo.id)}
                          className={`p-1.5 rounded-full ${
                            todo.important 
                              ? 'text-amber-400 hover:bg-amber-50' 
                              : 'text-gray-400 hover:text-amber-400 hover:bg-gray-100'
                          }`}
                          title={todo.important ? "Remove importance" : "Mark as important"}
                        >
                          <FiStar className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => startEdit(todo)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                          title="Edit task"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                          title="Delete task"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
      {/* Summary Footer */}
      {todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-between items-center text-sm text-gray-500 p-4 bg-white rounded-xl shadow"
        >
          <div>
            <span>{todos.filter(todo => !todo.completed).length} items left</span>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'text-indigo-600 font-medium' : ''}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={activeFilter === 'active' ? 'text-indigo-600 font-medium' : ''}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={activeFilter === 'completed' ? 'text-indigo-600 font-medium' : ''}
            >
              Completed
            </button>
          </div>
          
          <button
            onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            className="hover:text-indigo-600"
          >
            <FiArchive className="inline mr-1" /> Clear completed
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default TodoList;