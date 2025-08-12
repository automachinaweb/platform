const StatsSection = () => {
  const stats = [
    { number: "850+", label: "Registered Bartenders" },
    { number: "2,500+", label: "Events Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Cities Covered" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-warm-brown mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;