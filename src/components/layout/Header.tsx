
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  Heart, 
  UserCircle, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-1" /> },
    { name: "Discussions", path: "/discussions", icon: <MessageSquare className="h-4 w-4 mr-1" /> },
    { name: "Resources", path: "/resources", icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: "Support", path: "/support", icon: <Heart className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-serenity-500 to-calm-500 flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-serenity-700 to-calm-500 bg-clip-text text-transparent">
            MindTalk
          </span>
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
                  ? "bg-serenity-100 text-serenity-800 dark:bg-serenity-900/50 dark:text-serenity-100"
                  : "text-slate-600 hover:bg-serenity-50 dark:text-slate-300 dark:hover:bg-slate-800"
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex items-center gap-1 hover:bg-serenity-50 dark:hover:bg-slate-800"
          >
            <UserCircle className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
          
          <Button 
            className="hidden md:flex items-center gap-1 bg-gradient-to-r from-serenity-500 to-mindful-500 hover:from-serenity-600 hover:to-mindful-600 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Button>
          
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-serenity-100 text-serenity-800 dark:bg-serenity-900/50 dark:text-serenity-100"
                    : "text-slate-600 hover:bg-serenity-50 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start">
                <UserCircle className="h-4 w-4 mr-1" />
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-serenity-500 to-mindful-500">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
