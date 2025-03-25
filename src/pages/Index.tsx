
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Shield, 
  Users, 
  Brain, 
  MessageSquare, 
  Bot, 
  BarChart4,
  Leaf 
} from "lucide-react";

const Index: React.FC = () => {
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Create animated falling leaves effect
  useEffect(() => {
    const leaves = leafRefs.current.filter(Boolean) as HTMLDivElement[];
    leaves.forEach(leaf => {
      const startX = Math.random() * 100;
      leaf.style.left = `${startX}%`;
      leaf.style.animationDelay = `${Math.random() * 10}s`;
      leaf.style.animationDuration = `${10 + Math.random() * 20}s`;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Animated Leaves Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            ref={el => leafRefs.current[i] = el}
            className="absolute falling-leaf"
          >
            <Leaf className="text-green-500/10 dark:text-green-500/5" style={{ width: `${20 + Math.random() * 30}px` }} />
          </div>
        ))}
      </div>
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-green-900">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium mb-4">
                Mental Health Community
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent">
                Share, Connect, and Heal Together
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
                Join MentConv, a supportive community where you can openly discuss mental health, 
                share experiences, and find resources in a safe, judgment-free environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="waitlist-btn shadow-md hover:shadow-lg text-white"
                  asChild
                >
                  <Link to="/waitlist">
                    Join The Community
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20"
                  asChild
                >
                  <Link to="/discussions">
                    Browse Discussions <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-green-300/20 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                      "Finding a community that understands has been life-changing."
                    </h2>
                    <p className="text-slate-700 dark:text-slate-200 italic">
                      — Sarah, MentConv member for 2 years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-white dark:bg-green-950">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                A Safe Space for Mental Wellness
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Designed with your wellbeing in mind, our platform offers features that support 
                meaningful connections and personal growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Supportive Community
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Connect with others who understand your experiences in a 
                  moderated, respectful environment.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "200ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Anonymous Sharing
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Share your thoughts without revealing your identity, 
                  while still building meaningful connections.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Expert Guidance
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access resources and insights from verified mental health 
                  professionals and wellness experts.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "400ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Wellness Activities
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Participate in guided exercises, challenges, and activities 
                  designed to support your mental wellbeing.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "500ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  24/7 AI Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access immediate support through our AI assistant, 
                  offering resources and comfort when you need it most.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "600ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Mood Tracking
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Monitor your emotional wellbeing over time with 
                  personalized insights and progress tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <div className="container max-w-5xl mx-auto">
            <div className="card-glass rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  Begin Your Wellness Journey Today
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
                  Join thousands of individuals supporting each other through 
                  life's challenges and celebrating its victories.
                </p>
                <Button 
                  size="lg" 
                  className="waitlist-btn text-white shadow-md hover:shadow-lg"
                  asChild
                >
                  <Link to="/waitlist">
                    Join MentConv — It's Free
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  No pressure. Browse discussions as a guest before signing up.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
