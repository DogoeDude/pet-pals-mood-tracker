
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PetAnalysisCard = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4">
          <h3 className="font-bold text-lg">Pet Mood Analyzer</h3>
          <p className="text-sm opacity-80">
            Scan your pet to analyze their current mood
          </p>
        </div>
        
        <div className="p-4 bg-blue-50">
          <div className="relative border-2 border-dashed border-blue-300 rounded-lg overflow-hidden bg-white">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-pettalk-blue"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="font-medium text-gray-600">Tap to scan your pet</div>
                <p className="text-sm text-gray-500 mt-2">
                  Position your pet in the frame for accurate mood detection
                </p>
              </div>
            </div>
            
            {/* Scanning animation overlay (for visualization) */}
            <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse-slow"></div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="bg-pettalk-blue text-white px-6 py-2 rounded-lg font-medium flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Start Scanning
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetAnalysisCard;
