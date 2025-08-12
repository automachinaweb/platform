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

  const handleRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
    toast({
      title: "Registration Successful!",
      description: "Please login to continue.",
    });
  };

  const handleLogin = () => {
    setShowLogin(false);
    navigate('/booking');
    toast({
      title: "Login Successful!",
      description: "Welcome back!",
    });
  };

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
                <Input id="register-email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="register-username">Username</Label>
                <Input id="register-username" placeholder="Choose a username" />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" placeholder="Create a password" />
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
                <Input id="login-email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" placeholder="Enter your password" />
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
