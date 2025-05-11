import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Star, Filter, Heart, Plus, Minus, Trash2, X } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const categories = [
  { id: 1, name: 'Food', icon: '🍖' },
  { id: 2, name: 'Toys', icon: '🎾' },
  { id: 3, name: 'Health', icon: '💊' },
  { id: 4, name: 'Grooming', icon: '🛁' },
  { id: 5, name: 'Beds', icon: '🛏️' },
  { id: 6, name: 'Accessories', icon: '🦮' },
];

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 24.99,
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
    category: "Food",
    isFavorite: false,
    discount: 15,
  },
  {
    id: 2,
    name: "Interactive Pet Toy",
    price: 19.99,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    category: "Toys",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Complete Grooming Kit",
    price: 34.99,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36",
    category: "Grooming",
    isFavorite: false,
    discount: 10,
  },
  {
    id: 4,
    name: "Comfort Pet Bed",
    price: 49.99,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    category: "Beds",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Health Supplements",
    price: 29.99,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    category: "Health",
    isFavorite: true,
    discount: 20,
  },
  {
    id: 6,
    name: "Premium Collar Set",
    price: 39.99,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    category: "Accessories",
    isFavorite: false,
  },
];

const cartItems = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
    quantity: 2,
  },
  {
    id: 3,
    name: "Complete Grooming Kit",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36",
    quantity: 1,
  },
  {
    id: 5,
    name: "Health Supplements",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    quantity: 3,
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Pet Shop</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 sticky top-16 bg-background z-10 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search for pet products..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('All')}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="whitespace-nowrap"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-2 left-2 bg-white/80 hover:bg-white p-1 rounded-full">
                    <Heart
                      size={20}
                      className={product.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-pettalk-blue">
                      ${product.price}
                    </span>
                    <Button size="sm" className="bg-pettalk-blue text-white">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shopping Cart Modal */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle className="flex justify-between items-center">
            Shopping Cart
            <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </DialogTitle>
          
          <div className="mt-4 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span className="text-pettalk-blue">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-pettalk-blue text-white">
              Proceed to Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Shop; 