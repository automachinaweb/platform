import { useState } from "react";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onLogin: () => void;
}

const Navigation = ({ onLogin }: NavigationProps) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id.replace('login-', '')]: e.target.value
    });
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.id.replace('register-', '')]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!registerData.email || !registerData.password || !registerData.username) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (!result.success) {
        toast({
          title: "Registration Failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
        return;
      }

      setShowRegister(false);
      setShowLogin(true);
      toast({
        title: "Registration Successful!",
        description: "Please login to continue.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Registration failed, please try again",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      
      if (!result.success) {
        toast({
          title: "Login Failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
        return;
      }

      // Save user data
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", loginData.email);
      localStorage.setItem("name", result.user?.firstName || "User");
      localStorage.setItem("phone", result.user?.phone || "1234567890");

      setShowLogin(false);
      navigate('/booking');
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Login failed, please try again",
        variant: "destructive",
      });
    }
  };

  console.log(loginData);
  return (
    <>
      <Header
        onShowRegister={() => setShowRegister(true)}
        onShowLogin={() => setShowLogin(true)}
      />

      {/* Register Modal */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-warm-brown">Join PourConnect</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div>
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  placeholder="Choose a username"
                  value={registerData.username}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <Button variant="hero" className="w-full" onClick={handleRegister}>
                Register
              </Button>
              <p className="text-sm text-center">
                Already registered?{" "}
                <span
                  className="cursor-pointer text-warm-brown hover:underline"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-warm-brown">Welcome Back</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                />
              </div>
              <Button variant="hero" className="w-full" onClick={handleLogin}>
                Login
              </Button>
              <p className="text-sm text-center">
                Not a user?{" "}
                <span
                  className="cursor-pointer text-warm-brown hover:underline"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
