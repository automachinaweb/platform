import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
  onShowRegister: () => void;
  onShowLogin: () => void;
  onLogout: () => void;
}

const Header = ({ isLoggedIn, userName, onShowRegister, onShowLogin, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  const handleUserNameClick = () => {
    navigate("/notfound");
  };

  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-warm-brown">PourConnect</div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className="relative text-foreground hover:text-warm-brown px-3 py-2 text-sm font-medium transition-colors
                after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-warm-brown after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link
                to="/booking"
                className="relative text-foreground hover:text-warm-brown px-3 py-2 text-sm font-medium transition-colors
                after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-warm-brown after:transition-all after:duration-300 hover:after:w-full"
              >
                Book Now
              </Link>
              <a
                href="#reviews"
                className="relative text-foreground hover:text-warm-brown px-3 py-2 text-sm font-medium transition-colors
                after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-warm-brown after:transition-all after:duration-300 hover:after:w-full"
              >
                Reviews
              </a>
              <Link
                to="/cart"
                className="relative text-foreground hover:text-warm-brown px-3 py-2 text-sm font-medium transition-colors
                after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-warm-brown after:transition-all after:duration-300 hover:after:w-full"
              >
                Cart
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={handleUserNameClick}>{userName}</Button>
                <Button variant="hero" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="hero-outline" size="sm" onClick={onShowRegister}>
                  Register
                </Button>
                <Button variant="hero" size="sm" onClick={onShowLogin}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
