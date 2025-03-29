

// // App.jsx
// import { useState } from 'react';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import MainScreen from './components/MainScreen';
// import TaskReminder from './components/TaskReminder';
// import TodoList from './components/TodoList';
// import Notifications from './components/Notifications';
// import Profile from './components/Profile';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import Logout from './components/auth/Logout';

// // Main App content that uses auth context
// function AppContent() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const { currentUser, logout, completeLogout, cancelLogout, showLogoutModal } = useAuth();
//   const [authMode, setAuthMode] = useState('signin');

//   const renderMainContent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return <MainScreen 
//                  activeComponent={activeComponent} 
//                  setActiveComponent={setActiveComponent} 
//                />;
//       case 'profile':
//         return <Profile />;
//       case 'tasks':
//         return <TaskReminder />;
//       case 'todo':
//         return <TodoList />;
//       case 'notifications':
//         return <Notifications />;
//       default:
//         return <MainScreen 
//                  activeComponent={activeComponent} 
//                  setActiveComponent={setActiveComponent} 
//                />;
//     }
//   };

//   // If user is not authenticated, show auth screens
//   if (!currentUser) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {authMode === 'signin' ? (
//           <SignIn 
//             switchToSignUp={() => setAuthMode('signup')} 
//           />
//         ) : (
//           <SignUp 
//             switchToSignIn={() => setAuthMode('signin')} 
//           />
//         )}
//       </div>
//     );
//   }

//   // User is authenticated, show main application
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar 
//         onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//         onNavigate={setActiveComponent}
//         onLogout={logout}
//         user={currentUser}
//       />
      
//       <div className="flex flex-1">
//         <Sidebar 
//           isOpen={isSidebarOpen} 
//           onClose={() => setIsSidebarOpen(false)}
//           onNavigate={setActiveComponent}
//           activeComponent={activeComponent}
//         />
//         <main className="flex-1 overflow-y-auto">
//           {renderMainContent()}
//         </main>
//       </div>
      
//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <Logout 
//           cancelLogout={cancelLogout}
//           onCompleteLogout={completeLogout}
//         />
//       )}
//     </div>
//   );
// }

// // Main App component with AuthProvider wrapper
// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;








// App.jsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainScreen from './components/MainScreen';
import TaskReminder from './components/TaskReminder';
import TodoList from './components/TodoList';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Logout from './components/auth/Logout';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const { currentUser, logout, completeLogout, cancelLogout, showLogoutModal } = useAuth();
  const [authMode, setAuthMode] = useState('signin');

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

  // If user is not authenticated, show auth screens
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        {authMode === 'signin' ? (
          <SignIn 
            switchToSignUp={() => setAuthMode('signup')} 
          />
        ) : (
          <SignUp 
            switchToSignIn={() => setAuthMode('signin')} 
          />
        )}
      </div>
    );
  }

  // User is authenticated, show main application
  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden bg-gray-50">
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        onNavigate={setActiveComponent}
        onLogout={logout}
        user={currentUser}
      />
      
      {/* Add height calculation to account for navbar */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={setActiveComponent}
          activeComponent={activeComponent}
        />
        {/* Add overflow-y-auto to enable scrolling for the main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
      
      {/* Logout Modal */}
      {showLogoutModal && (
        <Logout 
          cancelLogout={cancelLogout}
          onCompleteLogout={completeLogout}
        />
      )}
    </div>
  );
}

// Main App component with AuthProvider wrapper
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;