import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, MessageCircle, ShoppingCart } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        <Link to="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/discover" className={`flex flex-col items-center ${isActive('/discover') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link to="/shop" className={`flex flex-col items-center ${isActive('/shop') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <ShoppingCart size={24} />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        <Link to="/messages" className={`flex flex-col items-center ${isActive('/messages') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center ${isActive('/search') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile') ? 'text-pettalk-blue' : 'text-gray-500'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
