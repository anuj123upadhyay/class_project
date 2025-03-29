// components/Sidebar.jsx
function Sidebar({ isOpen, onClose, onNavigate, activeComponent }) {
    
        const menuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'tasks', label: 'Task Reminder', icon: '⏰' },
            { id: 'todo', label: 'To-Do List', icon: '📝' },
            { id: 'notifications', label: 'Notify Me', icon: '🔔' },
          
    ];
  
    return (
      <div 
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-300 ease-in-out bg-white w-64 shadow-lg z-30`}
      >
        <div className="p-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${
                activeComponent === item.id ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  export    default    Sidebar;