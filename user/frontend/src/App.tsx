import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BartenderSuggestions from "./pages/BartenderSuggestions";
import Cart from "./pages/Cart";
import BartenderProfile from "./pages/BartenderProfile";
import ChatPage from "./pages/Chat";
import BookingPage from "./pages/BookingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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

export default App;
