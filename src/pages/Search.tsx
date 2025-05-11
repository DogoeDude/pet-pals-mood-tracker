import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, MapPin, Phone, Star, Navigation, Calendar, Clock, Share2 } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Mock data for nearby pet places
const nearbyPlaces = [
  {
    id: 1,
    name: "Pawsome Pet Care",
    type: "Veterinary Clinic",
    rating: 4.8,
    reviews: [
      { id: 1, user: "Sarah", rating: 5, text: "Amazing service! The staff is very caring and professional.", date: "2 days ago" },
      { id: 2, user: "Mike", rating: 4, text: "Great place, but a bit pricey. Worth it for the quality of care.", date: "1 week ago" }
    ],
    address: "123 Pet Street, New York",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    services: ["Check-ups", "Vaccinations", "Surgery", "Dental Care"],
    image: "https://images.unsplash.com/photo-1628009368231-7bb4cd3faa89?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Furry Friends Grooming",
    type: "Pet Grooming",
    rating: 4.6,
    reviews: [
      { id: 1, user: "Emma", rating: 5, text: "My dog looks amazing after every visit!", date: "3 days ago" },
      { id: 2, user: "John", rating: 4, text: "Very professional grooming service.", date: "2 weeks ago" }
    ],
    address: "456 Bark Avenue, New York",
    phone: "(555) 234-5678",
    hours: "Mon-Sat: 8AM-7PM",
    services: ["Bathing", "Haircuts", "Nail Trimming", "Ear Cleaning"],
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Pet Paradise Store",
    type: "Pet Supplies",
    rating: 4.7,
    reviews: [
      { id: 1, user: "Lisa", rating: 5, text: "Best selection of pet food and toys!", date: "1 day ago" },
      { id: 2, user: "Tom", rating: 4, text: "Great prices and friendly staff.", date: "1 week ago" }
    ],
    address: "789 Meow Lane, New York",
    phone: "(555) 345-6789",
    hours: "Mon-Sun: 10AM-8PM",
    services: ["Pet Food", "Toys", "Accessories", "Grooming Supplies"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=60"
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setShowReviews(true);
  };

  const handleScheduleAppointment = () => {
    setShowReviews(false);
    setShowAppointment(true);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to schedule the appointment
    alert(`Appointment scheduled for ${appointmentDate} at ${appointmentTime}`);
    setShowAppointment(false);
    setAppointmentDate('');
    setAppointmentTime('');
  };

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

        <h2 className="text-xl font-semibold mt-8 mb-4">Near You</h2>
        <div className="space-y-4">
          {nearbyPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => handlePlaceClick(place)}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <img src={place.image} alt={place.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{place.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{place.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{place.type}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{place.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone size={14} />
                      <span>{place.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Map View</h2>
            <button className="text-pettalk-blue text-sm flex items-center gap-1">
              <Navigation size={16} />
              Get Directions
            </button>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-[300px] bg-gray-100">
              {/* Placeholder map image - replace with actual map when API key is available */}
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7C40.7128,-74.0060&markers=color:blue%7C40.7228,-74.0160&markers=color:blue%7C40.7028,-73.9960&key=YOUR_API_KEY" 
                alt="Map of nearby pet places"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x300/e2e8f0/64748b?text=Map+View';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                <p className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
                  Interactive map coming soon
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Click on a location to get directions or view more details
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Modal */}
      <Dialog open={showReviews} onOpenChange={setShowReviews}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{selectedPlace?.name}</h3>
              <p className="text-sm text-gray-500">{selectedPlace?.type}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={20} fill="currentColor" />
              <span className="text-lg font-semibold">{selectedPlace?.rating}</span>
            </div>
          </DialogTitle>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{selectedPlace?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span>{selectedPlace?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span>{selectedPlace?.hours}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Services</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPlace?.services.map((service) => (
                  <span key={service} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Reviews</h4>
              <div className="space-y-4">
                {selectedPlace?.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} fill="currentColor" className="text-yellow-400" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-pettalk-blue text-white hover:bg-blue-600"
                onClick={handleScheduleAppointment}
              >
                <Calendar size={16} className="mr-2" />
                Schedule Appointment
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/place/${selectedPlace?.id}`);
                  alert('Link copied to clipboard!');
                }}
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Modal */}
      <Dialog open={showAppointment} onOpenChange={setShowAppointment}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle>Schedule Appointment</DialogTitle>
          <form onSubmit={handleAppointmentSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Service</label>
              <select className="w-full p-2 border rounded-md" required>
                <option value="">Select a service</option>
                {selectedPlace?.services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full bg-pettalk-blue text-white hover:bg-blue-600">
              Schedule
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default Search;
