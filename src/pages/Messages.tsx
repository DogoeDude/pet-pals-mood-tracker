import React, { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { Search, Send, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Sample chat data
const chats = [
  {
    id: 1,
    name: 'Alice Smith',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastMessage: 'How is Bella doing today?',
    time: '2m ago',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Bob Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Let\'s meet at the dog park tomorrow!',
    time: '1h ago',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: 'Cathy Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'Thanks for the pet food recommendation!',
    time: '3h ago',
    unread: 0,
    online: true
  }
];

// Sample messages for the active chat
const sampleMessages = [
  {
    id: 1,
    sender: 'Alice Smith',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    message: 'Hi! How is Bella doing today?',
    time: '2m ago',
    isOwn: false
  },
  {
    id: 2,
    sender: 'You',
    message: 'She\'s doing great! Just had her morning walk',
    time: '1m ago',
    isOwn: true
  },
  {
    id: 3,
    sender: 'Alice Smith',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    message: 'That\'s wonderful! Would you like to join us for a playdate this weekend?',
    time: 'Just now',
    isOwn: false
  }
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      message: message.trim(),
      time: 'Just now',
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-[10vh]">
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Messages</h1>
          {activeChat && (
            <button onClick={() => setActiveChat(null)} className="text-white">
              Back
            </button>
          )}
        </div>
      </header>

      {!activeChat ? (
        // Chat List View
        <div className="container px-4 py-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredChats.map(chat => (
              <Card 
                key={chat.id} 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => setActiveChat(chat)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-pettalk-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        // Chat View
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              {activeChat.online && (
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{activeChat.name}</h3>
              <p className="text-xs text-gray-500">
                {activeChat.online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isOwn && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isOwn
                      ? 'bg-pettalk-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-medium mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-pettalk-blue"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Messages; 