
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import PetStatusCard from '@/components/PetStatusCard';
import PetAnalysisCard from '@/components/PetAnalysisCard';

const Dashboard = () => {
  // Mock pet data - in a real app, this would come from an API
  const pets = [
    { 
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: 3,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      mood: "Happy",
      health: 85,
      hunger: 60,
    },
    { 
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Siamese",
      age: 2,
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      mood: "Content",
      health: 90,
      hunger: 75,
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">PetTalk</h1>
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-blue-700">
            Settings
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="container px-4 py-6 space-y-6">
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Pets</h2>
            <Button variant="ghost" size="sm" className="text-pettalk-blue flex items-center">
              <PlusCircle className="mr-1" size={16} />
              Add Pet
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {pets.map(pet => (
              <Card key={pet.id} className="overflow-hidden border-none shadow-md">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1/3">
                      <div className="aspect-square relative">
                        <img 
                          src={pet.image} 
                          alt={pet.name} 
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{pet.name}</h3>
                          <p className="text-sm text-gray-600">{pet.breed}, {pet.age} years</p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {pet.mood}
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Health</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${pet.health}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Hunger</span>
                          <div className="w-2/3 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full" 
                              style={{ width: `${pet.hunger}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Pet Analysis</h2>
          <PetAnalysisCard />
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Pet Status</h2>
          <PetStatusCard petId={1} />
        </section>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
