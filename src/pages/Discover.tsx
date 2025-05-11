import React, { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { UserPlus, Heart, MessageCircle, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const petPosts = [
  {
    id: 1,
    owner: 'Alice',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    time: '2 hours ago',
    text: 'Meet Bella! She loves playing fetch and making new friends.',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
    likes: 24,
    comments: [
      { id: 1, user: 'Bob', text: 'She\'s adorable! 😍', time: '1h ago' },
      { id: 2, user: 'Cathy', text: 'What a beautiful dog!', time: '30m ago' }
    ],
    isFollowing: false,
    isLiked: false,
  },
  {
    id: 2,
    owner: 'Bob',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    time: '5 hours ago',
    text: 'Charlie just learned a new trick! So proud of him 🐶',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
    likes: 15,
    comments: [
      { id: 1, user: 'Alice', text: 'Amazing! What trick did he learn?', time: '4h ago' }
    ],
    isFollowing: true,
    isLiked: true,
  },
  {
    id: 3,
    owner: 'Cathy',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    time: '1 day ago',
    text: 'Cooper enjoyed his first swim today! 🏊‍♂️',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
    likes: 32,
    comments: [
      { id: 1, user: 'Bob', text: 'He looks so happy!', time: '23h ago' },
      { id: 2, user: 'Alice', text: 'Great job Cooper!', time: '22h ago' }
    ],
    isFollowing: false,
    isLiked: false,
  },
];

const Discover = () => {
  const [posts, setPosts] = useState(petPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleFollow = (id) => {
    setPosts(posts => posts.map(post => 
      post.id === id ? { ...post, isFollowing: !post.isFollowing } : post
    ));
  };

  const handleLike = (id) => {
    setPosts(posts => posts.map(post => 
      post.id === id ? { 
        ...post, 
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        isLiked: !post.isLiked 
      } : post
    ));
  };

  const handleComment = (postId) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: 'You',
      text: commentText,
      time: 'Just now'
    };

    setPosts(posts => posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, newComment]
      } : post
    ));
    setCommentText('');
  };

  const handleShare = (post) => {
    setShareUrl(`${window.location.origin}/post/${post.id}`);
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-pettalk-blue p-4 text-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Discover</h1>
        </div>
      </header>
      
      <div className="container px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Pet Community</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <img src={post.avatar} alt={post.owner} className="h-10 w-10 rounded-full object-cover border" />
                  <div>
                    <p className="font-medium">{post.owner}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                  <div className="ml-auto">
                    <Button
                      size="sm"
                      variant={post.isFollowing ? 'secondary' : 'outline'}
                      className="flex items-center gap-1"
                      onClick={() => handleFollow(post.id)}
                    >
                      <UserPlus size={16} /> {post.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 dark:text-gray-200">{post.text}</p>
              </div>
              <img src={post.image} alt="pet" className="w-full h-56 object-cover" />
              <div className="p-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <div className="flex gap-4">
                  <button 
                    className={`flex items-center gap-1 transition ${post.isLiked ? 'text-red-500' : 'hover:text-pettalk-blue'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} /> {post.likes}
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-pettalk-blue transition"
                    onClick={() => setSelectedPost(post)}
                  >
                    <MessageCircle size={18} /> {post.comments.length}
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-pettalk-blue transition"
                    onClick={() => handleShare(post)}
                  >
                    <Share2 size={18} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle className="flex justify-between items-center">
            Comments
            <button onClick={() => setSelectedPost(null)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </DialogTitle>
          <div className="mt-4 space-y-4">
            {selectedPost?.comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleComment(selectedPost.id)}
                disabled={!commentText.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogTitle>Share Post</DialogTitle>
          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Facebook
              </button>
              <button className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition">
                Twitter
              </button>
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                WhatsApp
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Email
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
