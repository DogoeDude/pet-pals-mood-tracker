import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, ShoppingCart, PawPrint, Plus, Smile, HeartPulse, Utensils, Star } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import PetStatusCard from '@/components/PetStatusCard';
import PetAnalysisCard from '@/components/PetAnalysisCard';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useTheme } from '../theme/ThemeProvider';

const Dashboard = () => {
  // Dog images from Unsplash (replace with your own if desired):
  // https://images.unsplash.com/photo-1582562124811-c09040d0a901 (Golden Retriever)
  // https://images.unsplash.com/photo-1518717758536-85ae29035b6d (Beagle)
  // https://images.unsplash.com/photo-1558788353-f76d92427f16 (French Bulldog)
  // https://images.unsplash.com/photo-1518715308788-3003c37e3c71 (Labrador)
  // https://images.unsplash.com/photo-1507146426996-ef05306b995a (Shiba Inu)
  // https://images.unsplash.com/photo-1518715308788-3003c37e3c71 (Border Collie)
  // https://images.unsplash.com/photo-1465101046530-73398c7f28ca (Corgi)
  // https://images.unsplash.com/photo-1518715308788-3003c37e3c71 (Poodle)
  const pets = [
    { 
      id: 2,
      name: "Bella",
      species: "Dog",
      breed: "Beagle",
      age: 2,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
      mood: "Playful",
      health: 92,
      hunger: 70,
    },
    { 
      id: 3,
      name: "Charlie",
      species: "Dog",
      breed: "French Bulldog",
      age: 4,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
      mood: "Sleepy",
      health: 75,
      hunger: 30,
    },
    { 
      id: 5,
      name: "Cooper",
      species: "Dog",
      breed: "Shiba Inu",
      age: 2,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
      mood: "Curious",
      health: 88,
      hunger: 45,
    },
  ];
  
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [addPetOpen, setAddPetOpen] = React.useState(false);
  const [newPet, setNewPet] = React.useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    image: null
  });
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPet({ ...newPet, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the pet
    console.log('New pet:', newPet);
    setAddPetOpen(false);
    setNewPet({ name: '', species: '', breed: '', age: '', image: null });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2"><PawPrint size={28} className="inline-block" /> PetTalk</h1>
        </div>
      </header>
      
      {/* Main content */}
      <div className="mx-auto px-2 py-6 space-y-8 max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* My Pets */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl md:text-2xl font-semibold">My Pets</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-pettalk-blue flex items-center"
              onClick={() => setAddPetOpen(true)}
            >
              <Plus className="mr-1" size={18} />
              <span className="hidden sm:inline">Add Pet</span>
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {pets.map(pet => (
              <Card key={pet.id} className="min-w-[220px] max-w-[220px] bg-card text-card-foreground rounded-xl shadow-md flex-shrink-0 hover:shadow-lg transition cursor-pointer border-none" onClick={() => handlePetClick(pet)}>
                <CardContent className="p-4 flex flex-col items-center">
                  <img src={pet.image} alt={pet.name} className="h-14 w-14 rounded-full object-cover border-2 border-pettalk-blue mb-2" />
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{pet.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${pet.mood === 'Playful' ? 'bg-green-100 text-green-700' : pet.mood === 'Sleepy' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{pet.mood}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{pet.breed}, {pet.age} years</p>
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <HeartPulse size={14} className="text-green-500" />
                      <span className="text-xs">Health</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pet.health}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils size={14} className="text-yellow-500" />
                      <span className="text-xs">Hunger</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${pet.hunger}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card 
              className="min-w-[100px] max-w-[100px] bg-card text-card-foreground rounded-xl shadow-md flex-shrink-0 flex items-center justify-center border-dashed border-2 border-pettalk-blue cursor-pointer hover:bg-pettalk-blue/10 transition"
              onClick={() => setAddPetOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Plus size={32} className="text-pettalk-blue" />
                <span className="text-xs mt-2 text-pettalk-blue">Add Pet</span>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Pet Analysis & Pet Status */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Pet Analysis</h2>
            <PetAnalysisCard />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Pets Needing Attention</h2>
            <div className="space-y-4">
              {pets.map(pet => {
                const needsAttention = pet.hunger < 50 || pet.health < 80;
                if (!needsAttention) return null;

                return (
                  <Card key={pet.id} className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <img src={pet.image} alt={pet.name} className="h-16 w-16 rounded-full object-cover border-2 border-pettalk-blue" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{pet.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              pet.mood === 'Playful' ? 'bg-green-100 text-green-700' : 
                              pet.mood === 'Sleepy' ? 'bg-blue-100 text-blue-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {pet.mood}
                            </span>
                          </div>
                          
                          {pet.hunger < 50 && (
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <Utensils size={14} className="text-yellow-500" />
                                  <span className="text-sm">Hunger</span>
                                </div>
                                <span className="text-sm text-red-500">Needs Food</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 rounded-full bg-yellow-500 transition-all duration-300"
                                  style={{ width: `${pet.hunger}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {pet.health < 80 && (
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <HeartPulse size={14} className="text-red-500" />
                                  <span className="text-sm">Health</span>
                                </div>
                                <span className="text-sm text-red-500">Needs Check-up</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 rounded-full bg-red-500 transition-all duration-300"
                                  style={{ width: `${pet.health}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="bg-pettalk-blue text-white hover:bg-blue-600">
                              Feed Now
                            </Button>
                            <Button size="sm" variant="outline">
                              Schedule Vet
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Pet Essentials */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Pet Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Food Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=500&auto=format&fit=crop&q=60" 
                    alt="Premium Dog Food" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Best Seller
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Premium Dog Food</h3>
                  <p className="text-sm text-gray-500">Natural ingredients, grain-free</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$24.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Toys */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60" 
                    alt="Interactive Pet Toy" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Interactive Pet Toy</h3>
                  <p className="text-sm text-gray-500">Durable, engaging play</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.6)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$19.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grooming */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&auto=format&fit=crop&q=60" 
                    alt="Grooming Kit" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Complete Grooming Kit</h3>
                  <p className="text-sm text-gray-500">Professional grooming tools</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$34.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Beds */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=60" 
                    alt="Comfort Pet Bed" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Comfort Pet Bed</h3>
                  <p className="text-sm text-gray-500">Orthopedic, washable</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.7)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$49.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=60" 
                    alt="Health Supplements" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Health Supplements</h3>
                  <p className="text-sm text-gray-500">Vitamins & minerals</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$29.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60" 
                    alt="Pet Accessories" 
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Sale
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Premium Collar Set</h3>
                  <p className="text-sm text-gray-500">Leather, adjustable</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-pettalk-blue">$39.99</span>
                    <Button size="sm" className="bg-pettalk-blue text-white rounded-full shadow-sm hover:bg-blue-600 transition">
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation />
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          {selectedPet && (
            <>
              <DialogTitle>{selectedPet.name}'s Status</DialogTitle>
              <PetStatusCard petId={selectedPet.id} />
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-800 font-medium">
                <span>AI Suggestions (coming soon):</span>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  <li>Take {selectedPet.name} for a walk today!</li>
                  <li>Check {selectedPet.name}'s food and water bowls.</li>
                  <li>Consider a grooming session this week.</li>
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-xs mx-auto">
          <DialogTitle>Settings</DialogTitle>
          <div className="space-y-4 mt-4">
            <Button variant="outline" className="w-full">Edit Account</Button>
            <Button variant="outline" className="w-full">Delete Account</Button>
            <Button variant="outline" className="w-full">Pro Upgrade</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add Pet Dialog */}
      <Dialog open={addPetOpen} onOpenChange={setAddPetOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle>Add New Pet</DialogTitle>
          <form onSubmit={handleAddPet} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pet Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Species</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newPet.species}
                onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                required
              >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Breed</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={newPet.age}
                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pet Photo</label>
              <div className="flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-32 h-32">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full border-2 border-pettalk-blue"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setNewPet({ ...newPet, image: null });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 border-2 border-dashed border-pettalk-blue rounded-full flex items-center justify-center cursor-pointer hover:bg-pettalk-blue/10 transition">
                    <div className="text-center">
                      <Plus className="mx-auto text-pettalk-blue" size={24} />
                      <span className="text-xs text-pettalk-blue mt-1 block">Upload Photo</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">Add Pet</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
