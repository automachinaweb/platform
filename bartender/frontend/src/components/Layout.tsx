import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('bartender-logged-in') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('bartender-username') || '');
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "", username: "", password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      try {
        const response = await fetch('http://localhost:3001/bartender/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginForm.email,
            password: loginForm.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('bartender-logged-in', 'true');
          localStorage.setItem('bartender-email', loginForm.email);
          localStorage.setItem('bartender-username', data.user.name); // Assuming backend returns username on login
          setIsLoggedIn(true);
          setUsername(data.user.name);
          setLoginOpen(false);
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
          navigate('/questionnaire');
        } else {
          const errorData = await response.json();
          toast({
            title: "Login Failed",
            description: errorData.message || "Invalid credentials.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred during login.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.email && registerForm.username && registerForm.password) {
      try {
        const response = await fetch('http://localhost:3001/bartender/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: registerForm.username, // Mapping username to name for the backend
            email: registerForm.email,
            password: registerForm.password,
          }),
        });

        if (response.ok) {
          setRegisterOpen(false);
          setLoginOpen(true); // Open login dialog after successful registration
          toast({
            title: "Registration successful!",
            description: "Please login with your credentials.",
          });
        } else {
          const errorData = await response.json();
          toast({
            title: "Registration Failed",
            description: errorData.message || "An error occurred during registration.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred during registration.",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bartender-logged-in');
    localStorage.removeItem('bartender-username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  console.log('isLoggedIn:', isLoggedIn, 'username:', username);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">PourConnect</h1>
          
          <nav className="flex items-center gap-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground hover:text-primary"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/reviews')}
              className="text-foreground hover:text-primary"
            >
              Reviews
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/chat')}
              className="text-foreground hover:text-primary"
            >
              Chat
            </Button>
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="text-foreground font-medium"
                >
                  Welcome, {username}!
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl">Welcome Back</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        Continue with Google
                      </Button>
                      <div className="text-center text-sm text-muted-foreground">OR</div>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="login-password">Password</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Login
                        </Button>
                      </form>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {setLoginOpen(false); setRegisterOpen(true);}}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          Not a user? Register
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Join as Bartender
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl">Join PourConnect</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        Continue with Google
                      </Button>
                      <div className="text-center text-sm text-muted-foreground">OR</div>
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="register-username">Username</Label>
                          <Input
                            id="register-username"
                            type="text"
                            placeholder="Choose a username"
                            value={registerForm.username}
                            onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="register-password">Password</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Register
                        </Button>
                      </form>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {setRegisterOpen(false); setLoginOpen(true);}}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          Already registered? Login
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;