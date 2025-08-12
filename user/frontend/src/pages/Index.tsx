import { useState } from "react";
import LandingPage from "./LandingPage";
import BookingPage from "./BookingPage";


type UserType = 'client' | 'bartender' | null;
type ViewType = 'landing' | 'booking' | 'bartender-dashboard' | 'client-dashboard' | 'chat';

const Index = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  const handleLogin = () => {
    setCurrentView('booking');
  };

  const handleNavigateToChat = () => {
    setCurrentView('chat');
  };

  const handleBackToDashboard = () => {
    if (userType === 'bartender') {
      setCurrentView('bartender-dashboard');
    } else if (userType === 'client') {
      setCurrentView('client-dashboard');
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserType(null);
  };

  // Render based on current view
  if (currentView === 'booking') {
    return <BookingPage onBack={handleBackToLanding} />;
  }

  // Default to landing page
  return <LandingPage onLogin={handleLogin} />;
};

export default Index;
