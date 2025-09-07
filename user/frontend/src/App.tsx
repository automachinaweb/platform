import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BartenderSuggestions from "./pages/BartenderSuggestions";
import Cart from "./pages/Cart";
import BartenderProfile from "./pages/BartenderProfile";
import ChatPage from "./pages/Chat";
import BookingPage from "./pages/BookingPage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header 
            isLoggedIn={isLoggedIn} 
            userName={userName} 
            onLogout={handleLogout} 
            onShowLogin={() => setShowLogin(true)} 
            onShowRegister={() => setShowRegister(true)} 
          />
          <Navigation 
            onLogin={handleLogin} 
            showLogin={showLogin} 
            setShowLogin={setShowLogin} 
            showRegister={showRegister} 
            setShowRegister={setShowRegister} 
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/booking" element={<BookingPage onBack={() => window.history.back()} />} />
            <Route path="/bartenders" element={<BartenderSuggestions />} />
            <Route path="/bartender/:bartenderId" element={<BartenderProfile />} />
            <Route path="/chat/:bartenderId" element={<ChatPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
