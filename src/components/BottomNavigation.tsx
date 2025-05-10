
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, Compass } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/dashboard',
    },
    {
      label: 'Discover',
      icon: Compass,
      path: '/discover',
    },
    {
      label: 'Search',
      icon: Search,
      path: '/search',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`py-2 px-3 flex flex-1 flex-col items-center ${
                isActive ? 'text-pettalk-blue' : 'text-gray-500'
              }`}
            >
              <div className={`p-1 ${isActive ? 'bg-blue-100 rounded-full' : ''}`}>
                <item.icon size={20} />
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
