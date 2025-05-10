
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search pets, services, or products" 
              className="pl-10 h-10 bg-white border-0"
            />
          </div>
        </div>
      </header>
      
      <div className="container px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <h3 className="font-medium">Pet Grooming</h3>
            <p className="text-sm text-gray-500">Find local services</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <h3 className="font-medium">Pet Food</h3>
            <p className="text-sm text-gray-500">Best brands & nutrition</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <h3 className="font-medium">Pet Health</h3>
            <p className="text-sm text-gray-500">Vets & medical care</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <h3 className="font-medium">Training Tips</h3>
            <p className="text-sm text-gray-500">Expert advice</p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Near You</h2>
        <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Search;
