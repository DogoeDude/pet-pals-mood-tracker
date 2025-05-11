import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PetStatusCardProps {
  petId: number;
}

const PetStatusCard: React.FC<PetStatusCardProps> = ({ petId }) => {
  // Mock data - in a real app, this would come from an API based on the petId
  const statusData = {
    lastMeal: "2 hours ago",
    lastWalk: "4 hours ago",
    mood: {
      current: "Happy",
      history: [
        { time: "08:00", value: "Neutral" },
        { time: "10:00", value: "Happy" },
        { time: "12:00", value: "Excited" },
        { time: "14:00", value: "Happy" },
      ]
    },
    health: {
      status: "Good",
      score: 85,
    },
    hunger: {
      level: "Medium",
      lastFed: "10:30 AM",
      nextMeal: "06:30 PM",
    }
  };
  
  const getStatusColor = (type: string) => {
    switch (type) {
      case "Happy":
      case "Excited":
      case "Good":
        return "bg-green-100 text-green-800";
      case "Neutral":
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Sad":
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden font-sans shadow-lg border border-gray-200 bg-white rounded-2xl hover:shadow-xl transition cursor-pointer" onClick={() => setOpen(true)}>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Mood</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.mood.current)}`}>
                  {statusData.mood.current}
                </span>
              </div>
              
              <div className="h-20 bg-gray-50 rounded-lg p-2 flex items-end">
                {statusData.mood.history.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div 
                      className={`w-full max-w-[20px] ${getStatusColor(item.value)} rounded-t-sm`}
                      style={{ 
                        height: item.value === "Excited" ? "100%" : 
                                item.value === "Happy" ? "75%" : 
                                item.value === "Neutral" ? "50%" : "25%" 
                      }}
                    ></div>
                    <span className="text-xs mt-1">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Health</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.health.status)}`}>
                    {statusData.health.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${statusData.health.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Hunger</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.hunger.level)}`}>
                    {statusData.hunger.level}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Last fed: {statusData.hunger.lastFed}</span>
                  <span>Next meal: {statusData.hunger.nextMeal}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500">Last meal</span>
              <p className="font-medium">{statusData.lastMeal}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500">Last walk</span>
              <p className="font-medium">{statusData.lastWalk}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="font-sans max-w-md mx-auto">
          <DialogTitle>Pet Status Details</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-base mb-1">Mood</h4>
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.mood.current)}`}>{statusData.mood.current}</div>
                <div className="mt-2 text-xs text-gray-500">Mood history: {statusData.mood.history.map(h => `${h.time}: ${h.value}`).join(', ')}</div>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">Health</h4>
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.health.status)}`}>{statusData.health.status}</div>
                <div className="mt-2 text-xs text-gray-500">Health score: {statusData.health.score}%</div>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">Hunger</h4>
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(statusData.hunger.level)}`}>{statusData.hunger.level}</div>
                <div className="mt-2 text-xs text-gray-500">Last fed: {statusData.hunger.lastFed}, Next meal: {statusData.hunger.nextMeal}</div>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">Grooming</h4>
                <div className="text-xs text-gray-500">Needs grooming: <span className="font-semibold text-green-700">No</span></div>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">Last Meal</h4>
                <div className="text-xs text-gray-500">{statusData.lastMeal}</div>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">Last Walk</h4>
                <div className="text-xs text-gray-500">{statusData.lastWalk}</div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PetStatusCard;
