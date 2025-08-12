import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import reviewsData from "@/data/reviews.json";

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers who trusted us with their special moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviewsData.slice(0, 7).map((review) => (
            <Card key={review.id} className="relative shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-black-300/60" />
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.comment}"
                </p>

                <div className="space-y-1">
                  <div className="font-semibold">{review.customerName}</div>
                  <div className="text-sm text-muted-foreground">{review.event}</div>
                  <div className="text-sm text-muted-foreground">
                    Bartender: {review.bartenderName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-muted/50 rounded-full px-8 py-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-muted-foreground">
              Based on <span className="font-semibold">500+</span> reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
