
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to login screen after logout
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="sm" className="text-white">
            <Settings size={18} />
          </Button>
        </div>
      </header>
      
      <div className="container px-4 py-6 space-y-6">
        <Card className="border-none shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-pettalk-blue h-24 relative"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-12">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center">
                  <User size={40} className="text-gray-500" />
                </div>
                <h2 className="mt-2 text-xl font-bold">Pet Owner</h2>
                <p className="text-sm text-gray-500">example@email.com</p>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-500">Pets</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Friends</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-left h-12">
            <User className="mr-2" size={18} />
            Account Settings
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left h-12">
            <Settings className="mr-2" size={18} />
            App Preferences
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-red-600 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={18} />
            Log Out
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
