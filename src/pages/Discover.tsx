
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';

const Discover = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Discover</h1>
        </div>
      </header>
      
      <div className="container px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Pet Community</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100"></div>
                  <div>
                    <p className="font-medium">Pet Owner {item}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">
                  This is a placeholder post for the pet community section!
                </p>
              </div>
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 flex justify-between text-sm text-gray-500">
                <span>❤️ 24 likes</span>
                <span>💬 8 comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
