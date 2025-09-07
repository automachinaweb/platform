import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Plus, CreditCard, Calendar, MapPin, Clock, User, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  bartenderName: string;
  bartenderAvatar: string;
  eventType: string;
  date: string;
  time: string;
  duration: string;
  guests: string;
  price: number;
  status: "accepted" | "pending";
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      bartenderName: "Marcus Rodriguez",
      bartenderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      eventType: "Birthday Party",
      date: "2024-02-15",
      time: "7:00 PM",
      duration: "4 hours",
      guests: "25 guests",
      price: 300,
      status: "accepted"
    },
    {
      id: "2",
      bartenderName: "Isabella Chen",
      bartenderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      eventType: "Corporate Event",
      date: "2024-02-18",
      time: "6:00 PM",
      duration: "3 hours",
      guests: "50 guests",
      price: 225,
      status: "accepted"
    }
  ]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    // TODO: Integrate with payment processor (Stripe/Razorpay)
    console.log("Processing payment for:", cartItems);
    setShowPaymentModal(true);
  };

  const simulatePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false);
      // Clear cart and show success
      setCartItems([]);
      alert("Payment successful! Your bookings have been confirmed.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card className="shadow-card text-center py-12">
              <CardContent>
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Start browsing our talented bartenders to add services to your cart
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate("/bartenders")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Start Booking
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.bartenderAvatar}
                            alt={item.bartenderName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{item.bartenderName}</h3>
                              <Badge 
                                variant={item.status === "accepted" ? "default" : "secondary"}
                                className="capitalize"
                              >
                                {item.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {item.eventType}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {item.date} at {item.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {item.duration}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {item.guests}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between lg:flex-col lg:items-end space-y-2">
                          <div className="text-2xl font-bold text-primary">
                            ${item.price}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary Card */}
              <Card className="shadow-elegant border-primary/20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal ({cartItems.length} items):</span>
                      <span className="font-semibold">${totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee:</span>
                      <span>$25</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${totalAmount + 25}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => navigate("/bartenders")}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add More Services
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={handlePayment}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Processing</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-muted-foreground mb-6">
              Total Amount: <span className="font-bold text-primary">${totalAmount + 25}</span>
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={simulatePayment}
              className="w-full"
            >
              Complete Payment
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              This is a demo. No actual payment will be processed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;