// // App.jsx
// import { useState } from 'react';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import TaskReminder from './components/TaskReminder';
// import TodoList from './components/TodoList';
// import Notifications from './components/Notifications';
// import Profile from './components/Profile';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('tasks');

//   const renderMainContent = () => {
//     switch (activeComponent) {
//       case 'profile':
//         return <Profile />;
//       case 'tasks':
//         return <TaskReminder />;
//       case 'todo':
//         return <TodoList />;
//       case 'notifications':
//         return <Notifications />;
//       default:
//         return <TaskReminder />;
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-100">
//       <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <div className="flex h-[calc(100vh-64px)]">
//         <Sidebar 
//           isOpen={isSidebarOpen} 
//           onClose={() => setIsSidebarOpen(false)}
//           onNavigate={setActiveComponent}
//           activeComponent={activeComponent}
//         />
//         <main className="flex-1 overflow-auto p-6 transition-all duration-300">
//           {renderMainContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;









// App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainScreen from './components/MainScreen';
import TaskReminder from './components/TaskReminder';
import TodoList from './components/TodoList';
import Notifications from './components/Notifications';
import Profile from './components/Profile';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <MainScreen 
                 activeComponent={activeComponent} 
                 setActiveComponent={setActiveComponent} 
               />;
      case 'profile':
        return <Profile />;
      case 'tasks':
        return <TaskReminder />;
      case 'todo':
        return <TodoList />;
      case 'notifications':
        return <Notifications />;
      default:
        return <MainScreen 
                 activeComponent={activeComponent} 
                 setActiveComponent={setActiveComponent} 
               />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={setActiveComponent}
          activeComponent={activeComponent}
        />
        <main className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;