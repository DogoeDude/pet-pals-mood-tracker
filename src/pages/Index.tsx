
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to the landing page
    navigate('/landing');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-pettalk-blue">
      <div className="text-white text-center">
        <div className="animate-pulse">
          <h1 className="text-4xl font-bold mb-2">PetTalk</h1>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
