
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Twitter, Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
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
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              A supportive community for mental health discussions and resources.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-serenity-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-serenity-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-serenity-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-serenity-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/discussions" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Discussions
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Safety & Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Moderators
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Expert Verification
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Help & Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors flex items-center gap-1">
                  Crisis Support <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:support@mindtalk.com" className="text-sm text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors flex items-center gap-1">
                  <Mail className="h-3 w-3" /> support@mindtalk.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} MindTalk. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-serenity-500 dark:hover:text-serenity-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
