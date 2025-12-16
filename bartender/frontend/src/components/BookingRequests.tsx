import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingRequest {
  id: number;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  guestCount: number;
  offeredAmount: string;
  status: string;
}

const BookingRequests = () => {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("bartender-token"); // Assuming you store token here (Need to fix Login to store token!)
      // Fallback for now since Login might not be storing token in 'bartender-token' key yet, usually it's inside the response
      // Let's assume the previous login step stored it, or we rely on the user being logged in conceptually.
      // Wait, looking at Landing.tsx, it currently only stores: 'bartender-logged-in', 'bartender-email', 'bartender-username'.
      // It DOES NOT store the JWT token! This is a problem.
      // I need to fix Landing.tsx first to store the token, otherwise these requests will fail (401/403).

      // I will proceed assuming I will fix Landing.tsx in the next step or alongside this.
      // For now let's write the code to expect 'bartender-auth-token'.

      const storedToken = localStorage.getItem("bartender-auth-token");

      const response = await fetch(
        "http://localhost:3001/bartender/bookings/requests",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: number, action: "accept" | "reject") => {
    try {
      const storedToken = localStorage.getItem("bartender-auth-token");
      const response = await fetch(
        `http://localhost:3001/bartender/bookings/${id}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        toast({
          title: `Booking ${action === "accept" ? "Accepted" : "Rejected"}`,
          description: `You have successfully ${action}ed the booking request.`,
        });
        fetchRequests(); // Refresh list
      } else {
        toast({
          title: "Action Failed",
          description: "Could not process your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred.",
        variant: "destructive",
      });
    }
  };

  

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          Incoming Requests
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {requests.length}
          </Badge>
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchRequests}
          disabled={loading}
          title="Refresh requests"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">
          Checking for new requests...
        </div>
      ) : requests.length === 0 ? (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>No new booking requests at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <Card
              key={req.id}
              className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{req.eventType}</CardTitle>
                  {req.offeredAmount && (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50"
                    >
                      ${req.offeredAmount}
                    </Badge>
                  )}
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {req.eventDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2 pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {req.startTime} - {req.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{req.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{req.guestCount} Guests</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                  onClick={() => handleAction(req.id, "accept")}
                >
                  <Check className="h-4 w-4 mr-2" /> Accept
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                  size="sm"
                  onClick={() => handleAction(req.id, "reject")}
                >
                  <X className="h-4 w-4 mr-2" /> Reject
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
