import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Settings, Camera, LogOut, Moon, Sun, Bell, Shield, HelpCircle, CreditCard, Plus, X } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '../theme/ThemeProvider';
import { Image, Smile, MapPin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    text: '',
    image: null,
    location: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!newPost.text.trim() && !newPost.image) return;

    const post = {
      id: Date.now(),
      text: newPost.text,
      image: imagePreview,
      time: 'Just now',
    };

    // Here you would typically update the posts array
    console.log('New post:', post);
    setCreatePostOpen(false);
    setNewPost({ text: '', image: null, location: '' });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-background pb-[10vh]">
      {/* Cover Photo */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="cover" className="w-full h-full object-cover rounded-b-2xl" />
        {/* Edit Cover Button */}
        <button className="absolute right-4 bottom-4 bg-white/80 hover:bg-white p-2 rounded-full shadow" aria-label="Edit cover photo">
          <Camera size={18} className="text-gray-700" />
        </button>
        {/* Profile Picture */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 z-10">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center shadow-lg overflow-hidden relative">
            <User size={64} className="text-gray-500" />
            <button className="absolute bottom-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full shadow" aria-label="Edit profile picture">
              <Camera size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
        {/* Settings Button */}
        <button
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings size={22} className="text-gray-700" />
        </button>
      </div>
      {/* Main Card */}
      <div className="container max-w-2xl mx-auto pt-24 pb-4 px-4">
        <Card className="rounded-2xl shadow-lg border border-gray-200 bg-card text-card-foreground">
          <CardContent className="flex flex-col items-center p-6">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3xl font-bold mt-2">John Doe</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">johndoe@email.com</p>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex items-center gap-2" onClick={() => setEditOpen(true)}>
                  <Edit size={16}/> Edit Profile
                </Button>
                <Button 
                  variant="default" 
                  className="flex items-center gap-2 bg-pettalk-blue"
                  onClick={() => setCreatePostOpen(true)}
                >
                  <Plus size={16}/> Create Post
                </Button>
              </div>
              {/* Stats Bar */}
              <div className="flex justify-center gap-8 w-full mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold">12</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Friends</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">8</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">2</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Pets</p>
                </div>
              </div>
            </div>
            {/* Bio/About Section */}
            <div className="w-full mt-2 mb-4">
              <h3 className="font-semibold text-lg mb-1">Bio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pet lover. Enjoys long walks and playtime. Always looking for new friends for my pets!</p>
            </div>
            {/* Personal Info */}
            <div className="w-full mb-4">
              <h3 className="font-semibold text-lg mb-1">Personal Info</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><span className="font-medium">Location:</span> New York, USA</li>
                <li><span className="font-medium">Joined:</span> January 2023</li>
                <li><span className="font-medium">Birthday:</span> March 10, 1990</li>
              </ul>
            </div>
            {/* Your Posts */}
            <div className="w-full mb-4">
              <h3 className="font-semibold text-lg mb-1">Your Posts</h3>
              <div className="space-y-3">
                <Card className="bg-card text-card-foreground border-none shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm">Had a great walk with my dog today! 🐕</p>
                    <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                  </CardContent>
                </Card>
                <Card className="bg-card text-card-foreground border-none shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm">Adopted a new puppy! Meet Bella 🐶</p>
                    <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Shared Posts */}
            <div className="w-full mb-4">
              <h3 className="font-semibold text-lg mb-1">Shared Posts</h3>
              <div className="space-y-3">
                <Card className="bg-card text-card-foreground border-none shadow-sm">
                  <CardContent className="p-3">
                    <p className="text-sm">Check out this amazing pet adoption event!</p>
                    <div className="text-xs text-gray-400 mt-1">3 days ago</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Create Post Modal */}
      <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle className="flex justify-between items-center">
            Create Post
            <button onClick={() => setCreatePostOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </DialogTitle>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Your profile"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Public</p>
              </div>
            </div>

            <Textarea
              placeholder="What's on your mind?"
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              className="min-h-[100px]"
            />

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setNewPost({ ...newPost, image: null });
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 border-t pt-4">
              <label className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                <Image size={20} />
                <span className="text-sm">Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <Smile size={20} />
                <span className="text-sm">Feeling</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <MapPin size={20} />
                <span className="text-sm">Location</span>
              </button>
            </div>

            <Button 
              className="w-full bg-pettalk-blue text-white"
              onClick={handleCreatePost}
              disabled={!newPost.text.trim() && !newPost.image}
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Profile Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle>Edit Profile</DialogTitle>
          <div className="space-y-3 mt-4">
            {/* Add form fields for editing profile info here */}
            <input className="w-full border rounded p-2" placeholder="Name" defaultValue="John Doe" />
            <input className="w-full border rounded p-2" placeholder="Email" defaultValue="johndoe@email.com" />
            <textarea className="w-full border rounded p-2" placeholder="Bio" defaultValue="Pet lover. Enjoys long walks and playtime. Always looking for new friends for my pets!" />
            <Button className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle>Settings</DialogTitle>
          <div className="space-y-4 mt-4">
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2" size={20} />
              Edit Account
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="mr-2" size={20} />
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2" size={20} />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2" size={20} />
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="mr-2" size={20} />
              Pro Upgrade
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="mr-2" size={20} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2" size={20} />
                  Dark Mode
                </>
              )}
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start mt-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={20} />
              Log Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <BottomNavigation />
    </div>
  );
};

export default Profile;
