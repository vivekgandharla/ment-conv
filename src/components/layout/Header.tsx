
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  Heart, 
  UserCircle, 
  Menu, 
  X,
  TrendingUp,
  LogOut,
  User,
  Settings,
  Award,
  Shield,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-1" /> },
    { name: "Discussions", path: "/discussions", icon: <MessageSquare className="h-4 w-4 mr-1" /> },
    { name: "Resources", path: "/resources", icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: "Trending", path: "/trending", icon: <TrendingUp className="h-4 w-4 mr-1" /> },
    { name: "Support", path: "/support", icon: <Heart className="h-4 w-4 mr-1" /> },
  ];

  const userMenuItems = [
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4" /> },
    { name: "Expert Verification", path: "/expert-verification", icon: <Award className="h-4 w-4" /> },
    { name: "Moderator Application", path: "/moderator-application", icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-green-950/90 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <Logo size={isMobile ? "sm" : "md"} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                location.pathname === item.path
                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100"
                  : "text-slate-600 hover:bg-green-50 dark:text-slate-300 dark:hover:bg-green-900/20"
              )}
            >
              <div className="flex items-center">
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Auth Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {user.user_metadata?.display_name || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.path} className="flex items-center gap-2">
                        {item.icon}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">
                  <UserCircle className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              </Button>
              <Button className="waitlist-btn text-white shadow-md hover:shadow-lg" asChild>
                <Link to="/waitlist">Get Started</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-green-950 shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100"
                    : "text-slate-600 hover:bg-green-50 dark:text-slate-300 dark:hover:bg-green-900/20"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-green-800 pt-2 mt-2 flex flex-col gap-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {user.user_metadata?.display_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-green-50 dark:text-slate-300 dark:hover:bg-green-900/20 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/auth">
                      <UserCircle className="h-4 w-4 mr-1" />
                      Sign In
                    </Link>
                  </Button>
                  <Button className="waitlist-btn text-white" asChild>
                    <Link to="/waitlist">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
