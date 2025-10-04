import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, DollarSign, Clock, Star } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "", username: "", password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      localStorage.setItem('bartender-email', loginForm.email);
      localStorage.setItem('bartender-logged-in', 'true');
      setLoginOpen(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/questionnaire');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.email && registerForm.username && registerForm.password) {
      localStorage.setItem('bartender-email', registerForm.email);
      localStorage.setItem('bartender-username', registerForm.username);
      localStorage.setItem('bartender-logged-in', 'false');
      setRegisterOpen(false);
      toast({
        title: "Registration successful!",
        description: "Please login with your credentials.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Connect with Clients.<br />
            <span className="text-primary">Grow Your Business.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join PourConnect's network of professional bartenders. Get booked for exclusive events, 
            build lasting client relationships, and take your bartending career to the next level.
          </p>
          <div className="flex gap-4 justify-center">
            {localStorage.getItem('bartender-logged-in') === 'true' ? (
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/questionnaire')}>
                Start Your Journey
              </Button>
            ) : (
              <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-8 py-6">
                    Start Your Journey
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
            )}

            {localStorage.getItem('bartender-logged-in') === 'true' ? (
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
                I'm Already a Member
              </Button>
            ) : (
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    I'm Already a Member
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
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why Bartenders Choose PourConnect</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Direct Client Chat</h4>
              <p className="text-muted-foreground">Communicate directly with clients, discuss requirements, and build relationships.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Premium Rates</h4>
              <p className="text-muted-foreground">Set your own rates and earn what you're worth for high-quality service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Flexible Schedule</h4>
              <p className="text-muted-foreground">Work when you want, where you want. Full control over your availability.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Build Your Reputation</h4>
              <p className="text-muted-foreground">Collect reviews, showcase your skills, and become a top-rated bartender.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Pour Your Success?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professional bartenders who trust PourConnect to grow their business.
          </p>
          <Button size="lg" onClick={() => {
            if (localStorage.getItem('bartender-logged-in') === 'true') {
              navigate('/questionnaire');
            } else {
              setRegisterOpen(true);
            }
          }} className="text-lg px-8 py-6">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 PourConnect Pro. Connecting exceptional bartenders with exclusive events.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;