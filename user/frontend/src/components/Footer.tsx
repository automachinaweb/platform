const Footer = () => {
  return (
    <footer className="bg-warm-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">PourConnect</div>
            <p className="text-cream">
              Connecting you with professional bartenders for unforgettable events.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-cream">
              <li><a href="#" className="hover:text-white transition-colors">Event Bartending</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Parties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wedding Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-cream">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-cream">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream">
          <p>&copy; 2024 PourConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;