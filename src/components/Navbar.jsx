





// // // components/Navbar.jsx
// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiMenu, FiBell, FiUser, FiSearch, FiX } from 'react-icons/fi';

// // function Navbar({ onMenuClick }) {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
  
// //   // Handle scroll effect for navbar
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 10);
// //     };
    
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   return (
// //     <motion.nav
// //       initial={{ y: -20 }}
// //       animate={{ y: 0 }}
// //       transition={{ duration: 0.3 }}
// //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// //         scrolled 
// //           ? 'bg-white shadow-md' 
// //           : 'bg-gradient-to-r from-indigo-600 to-purple-600'
// //       }`}
// //     >
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
// //         <div className="flex justify-between items-center h-16">
// //           {/* Left: Menu button and logo */}
// //           <div className="flex items-center">
// //             <motion.button
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={onMenuClick}
// //               className={`p-2 rounded-md ${
// //                 scrolled 
// //                   ? 'text-gray-600 hover:bg-gray-100' 
// //                   : 'text-white hover:bg-white/10'
// //               }`}
// //             >
// //               <FiMenu className="h-6 w-6" />
// //             </motion.button>
            
// //             <div className="ml-3 flex items-center">
// //               <span className={`font-bold text-xl ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
// //                 WorkSync
// //               </span>
// //             </div>
// //           </div>

// //           {/* Center: Search (Desktop) */}
// //           <div className="hidden md:block flex-1 max-w-sm mx-8">
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
// //                   scrolled
// //                     ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300' 
// //                     : 'bg-white/10 text-white placeholder-white/70 focus:bg-white/20'
// //                 }`}
// //               />
// //               <FiSearch className={`absolute left-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`} />
// //               {searchQuery && (
// //                 <button 
// //                   onClick={() => setSearchQuery('')}
// //                   className={`absolute right-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`}
// //                 >
// //                   <FiX className="w-4 h-4" />
// //                 </button>
// //               )}
// //             </div>
// //           </div>
          
// //           {/* Right: Actions */}
// //           <div className="flex items-center space-x-1 sm:space-x-3">
// //             {/* Mobile search toggle */}
// //             <motion.button
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={() => setSearchOpen(!searchOpen)}
// //               className={`md:hidden p-2 rounded-md ${
// //                 scrolled 
// //                   ? 'text-gray-600 hover:bg-gray-100' 
// //                   : 'text-white hover:bg-white/10'
// //               }`}
// //             >
// //               <FiSearch className="h-5 w-5" />
// //             </motion.button>
            
// //             {/* Notifications */}
// //             <motion.button
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               className={`relative p-2 rounded-md ${
// //                 scrolled 
// //                   ? 'text-gray-600 hover:bg-gray-100' 
// //                   : 'text-white hover:bg-white/10'
// //               }`}
// //             >
// //               <FiBell className="h-5 w-5" />
// //               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
// //             </motion.button>
            
// //             {/* User */}
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               className="flex items-center"
// //             >
// //               <div className="flex items-center">
// //                 <img
// //                   src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
// //                   alt="User profile"
// //                   className="h-8 w-8 rounded-full object-cover border-2 border-white/30"
// //                 />
// //                 <span className={`ml-2 font-medium hidden sm:block ${
// //                   scrolled ? 'text-gray-700' : 'text-white'
// //                 }`}>
// //                   John Doe
// //                 </span>
// //               </div>
// //             </motion.button>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Mobile Search */}
// //       {searchOpen && (
// //         <motion.div 
// //           initial={{ height: 0, opacity: 0 }}
// //           animate={{ height: 'auto', opacity: 1 }}
// //           exit={{ height: 0, opacity: 0 }}
// //           className="md:hidden border-t border-white/10 py-3 px-4 bg-indigo-600"
// //         >
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:bg-white/20 focus:outline-none"
// //               autoFocus
// //             />
// //             <FiSearch className="absolute left-3 top-2.5 text-white/70" />
// //             {searchQuery && (
// //               <button 
// //                 onClick={() => setSearchQuery('')}
// //                 className="absolute right-3 top-2.5 text-white/70"
// //               >
// //                 <FiX className="w-4 h-4" />
// //               </button>
// //             )}
// //           </div>
// //         </motion.div>
// //       )}
// //     </motion.nav>
// //   );
// // }

// // export default Navbar;













// // components/Navbar.jsx
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiMenu, FiBell, FiUser, FiSearch, FiX } from 'react-icons/fi';

// function Navbar({ onMenuClick, onNavigate }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -20 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.3 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled 
//             ? 'bg-white shadow-md' 
//             : 'bg-gradient-to-r from-indigo-600 to-purple-600'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex justify-between items-center h-16">
//             {/* Left: Menu button and logo */}
//             <div className="flex items-center">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={onMenuClick}
//                 className={`p-2 rounded-md ${
//                   scrolled 
//                     ? 'text-gray-600 hover:bg-gray-100' 
//                     : 'text-white hover:bg-white/10'
//                 }`}
//               >
//                 <FiMenu className="h-6 w-6" />
//               </motion.button>
              
//               {/* WorkSync Logo - Clickable */}
//               <button 
//                 onClick={() => onNavigate('dashboard')}
//                 className="ml-3 flex items-center focus:outline-none transition-transform hover:scale-105"
//               >
//                 <div className={`w-8 h-8 rounded-md mr-2 flex items-center justify-center ${
//                   scrolled ? 'bg-indigo-100' : 'bg-white/20'
//                 }`}>
//                   <svg 
//                     width="16" 
//                     height="16" 
//                     viewBox="0 0 24 24" 
//                     fill="none" 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className={scrolled ? 'text-indigo-600' : 'text-white'}
//                   >
//                     <path 
//                       d="M4 12H20M12 4V20" 
//                       stroke="currentColor" 
//                       strokeWidth="2.5" 
//                       strokeLinecap="round" 
//                     />
//                   </svg>
//                 </div>
//                 <span className={`font-bold text-xl ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
//                   WorkSync
//                 </span>
//               </button>
//             </div>

//             {/* Center: Search (Desktop) */}
//             <div className="hidden md:block flex-1 max-w-sm mx-8">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
//                     scrolled
//                       ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300' 
//                       : 'bg-white/10 text-white placeholder-white/70 focus:bg-white/20'
//                   }`}
//                 />
//                 <FiSearch className={`absolute left-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`} />
//                 {searchQuery && (
//                   <button 
//                     onClick={() => setSearchQuery('')}
//                     className={`absolute right-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
            
//             {/* Right: Actions */}
//             <div className="flex items-center space-x-1 sm:space-x-3">
//               {/* Mobile search toggle */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSearchOpen(!searchOpen)}
//                 className={`md:hidden p-2 rounded-md ${
//                   scrolled 
//                     ? 'text-gray-600 hover:bg-gray-100' 
//                     : 'text-white hover:bg-white/10'
//                 }`}
//               >
//                 <FiSearch className="h-5 w-5" />
//               </motion.button>
              
//               {/* Notifications */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`relative p-2 rounded-md ${
//                   scrolled 
//                     ? 'text-gray-600 hover:bg-gray-100' 
//                     : 'text-white hover:bg-white/10'
//                 }`}
//               >
//                 <FiBell className="h-5 w-5" />
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//               </motion.button>
              
//               {/* User */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
//                     alt="User profile"
//                     className="h-8 w-8 rounded-full object-cover border-2 border-white/30"
//                   />
//                   <span className={`ml-2 font-medium hidden sm:block ${
//                     scrolled ? 'text-gray-700' : 'text-white'
//                   }`}>
//                     John Doe
//                   </span>
//                 </div>
//               </motion.button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Search */}
//         {searchOpen && (
//           <motion.div 
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden border-t border-white/10 py-3 px-4 bg-indigo-600"
//           >
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:bg-white/20 focus:outline-none"
//                 autoFocus
//               />
//               <FiSearch className="absolute left-3 top-2.5 text-white/70" />
//               {searchQuery && (
//                 <button 
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-3 top-2.5 text-white/70"
//                 >
//                   <FiX className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </motion.nav>
      
//       {/* Spacer div to prevent content from hiding under navbar */}
//       <div className="h-16"></div>
//     </>
//   );
// }

// export default Navbar;











// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiBell, FiUser, FiSearch, FiX, FiLogOut, FiSettings } from 'react-icons/fi';

function Navbar({ onMenuClick, onNavigate, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-menu-container')) {
        setShowUserDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserDropdown]);

  return (
    <>
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left: Menu button and logo */}
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMenuClick}
                className={`p-2 rounded-md ${
                  scrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <FiMenu className="h-6 w-6" />
              </motion.button>
              
              {/* WorkSync Logo - Clickable */}
              <button 
                onClick={() => onNavigate('dashboard')}
                className="ml-3 flex items-center focus:outline-none transition-transform hover:scale-105"
              >
                <div className={`w-8 h-8 rounded-md mr-2 flex items-center justify-center ${
                  scrolled ? 'bg-indigo-100' : 'bg-white/20'
                }`}>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={scrolled ? 'text-indigo-600' : 'text-white'}
                  >
                    <path 
                      d="M4 12H20M12 4V20" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </div>
                <span className={`font-bold text-xl ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
                  WorkSync
                </span>
              </button>
            </div>

            {/* Center: Search (Desktop) */}
            <div className="hidden md:block flex-1 max-w-sm mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                    scrolled
                      ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300' 
                      : 'bg-white/10 text-white placeholder-white/70 focus:bg-white/20'
                  }`}
                />
                <FiSearch className={`absolute left-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`} />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 top-2.5 ${scrolled ? 'text-gray-500' : 'text-white/70'}`}
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Right: Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Mobile search toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={`md:hidden p-2 rounded-md ${
                  scrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <FiSearch className="h-5 w-5" />
              </motion.button>
              
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('notifications')}
                className={`relative p-2 rounded-md ${
                  scrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              
              {/* User Menu Container */}
              <div className="relative user-menu-container">
                {/* User Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center"
                >
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
                      alt="User profile"
                      className={`h-8 w-8 rounded-full object-cover border-2 ${
                        scrolled ? 'border-indigo-100' : 'border-white/30'
                      }`}
                    />
                    <span className={`ml-2 font-medium hidden sm:block ${
                      scrolled ? 'text-gray-700' : 'text-white'
                    }`}>
                      John Doe
                    </span>
                    <svg 
                      className={`ml-1 h-5 w-5 transition-transform ${
                        showUserDropdown ? 'rotate-180' : ''
                      } ${
                        scrolled ? 'text-gray-700' : 'text-white'
                      }`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.button>
                
                {/* User Dropdown */}
                {showUserDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
                  >
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FiUser className="mr-3 h-4 w-4 text-gray-500" />
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        // Handle settings click
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FiSettings className="mr-3 h-4 w-4 text-gray-500" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        if (onLogout) onLogout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-3 h-4 w-4 text-red-500" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search */}
        {searchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 py-3 px-4 bg-indigo-600"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:bg-white/20 focus:outline-none"
                autoFocus
              />
              <FiSearch className="absolute left-3 top-2.5 text-white/70" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-white/70"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
      
      {/* Spacer div to prevent content from hiding under navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
