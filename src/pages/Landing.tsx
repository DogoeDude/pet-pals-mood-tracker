
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen pet-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center justify-center text-center space-y-8">
        <div className="space-y-2">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-pettalk-blue rounded-full blur-md opacity-20"></div>
            <div className="bg-pettalk-blue rounded-full p-5 relative">
              <img 
                src="/lovable-uploads/5ea5ce34-6f53-44c6-ba46-65302eb288ab.png" 
                alt="PetTalk Logo" 
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-pettalk-blue">PetTalk</h1>
        <p className="text-lg text-gray-600">Understand your pet's mood and health with AI-powered analysis</p>
        
        <div className="w-full mt-6 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-medium mb-3">Features</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-pettalk-blue font-medium">🔍 Mood Analysis</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-pettalk-blue font-medium">📊 Health Tracking</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-pettalk-blue font-medium">📷 Pet Profiles</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-pettalk-blue font-medium">🌐 Pet Community</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <Link to="/login">
            <Button className="w-full h-14 text-lg bg-pettalk-yellow hover:bg-yellow-400 text-black shadow-lg">
              Get Started
            </Button>
          </Link>
          <div className="mt-4 text-sm text-gray-500">
            Your pet's happiness is just a tap away!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
