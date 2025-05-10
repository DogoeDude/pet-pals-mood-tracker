
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Apple, Facebook } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock login - in a real app, this would connect to authentication services
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock successful login
    toast({
      title: isLogin ? "Login Successful" : "Registration Successful",
      description: isLogin ? "Welcome back!" : "Your account has been created!",
    });
    
    // Navigate to dashboard after login/signup
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login not implemented in this demo`,
    });
    
    // Mock social auth login
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pet-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-pettalk-blue rounded-full p-4 relative">
            <img 
              src="/lovable-uploads/5ea5ce34-6f53-44c6-ba46-65302eb288ab.png" 
              alt="PetTalk Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-gray-100"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12 bg-gray-100"
            />
          </div>
          
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Full Name"
                className="pl-10 h-12 bg-gray-100"
              />
            </div>
          )}
          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-pettalk-blue text-sm">
              Forgot Password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full h-12 bg-pettalk-yellow hover:bg-yellow-400 text-black font-medium">
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>
        </form>
        
        <div className="my-6 text-center text-sm text-gray-500">
          <span>or connect with</span>
        </div>
        
        <div className="space-y-3">
          <Button 
            type="button" 
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-12 bg-white hover:bg-gray-50 text-black border border-gray-300 font-medium flex items-center justify-center space-x-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" className="text-red-500">
              <path 
                fill="currentColor" 
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
              />
              <path 
                fill="#34A853" 
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
              />
              <path 
                fill="#FBBC05" 
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
              />
              <path 
                fill="#EA4335" 
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
              />
            </svg>
            <span>Login With Google</span>
          </Button>
          
          <Button 
            type="button" 
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full h-12 bg-white hover:bg-gray-50 text-black border border-gray-300 font-medium flex items-center justify-center space-x-2"
          >
            <Facebook className="text-blue-600" size={18} />
            <span>Login With Facebook</span>
          </Button>
          
          <Button 
            type="button" 
            onClick={() => handleSocialLogin('Apple')}
            className="w-full h-12 bg-white hover:bg-gray-50 text-black border border-gray-300 font-medium flex items-center justify-center space-x-2"
          >
            <Apple className="text-black" size={18} />
            <span>Login With Apple</span>
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-pettalk-blue hover:underline"
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
