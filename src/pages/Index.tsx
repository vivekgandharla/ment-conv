
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Shield, 
  Users, 
  HeartHandshake, 
  Brain, 
  Bot, 
  BarChart4 
} from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-serenity-50 to-white dark:from-slate-900 dark:to-slate-900">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-serenity-100 text-serenity-800 dark:bg-serenity-900 dark:text-serenity-200 text-sm font-medium mb-4">
                Mental Health Support Community
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-serenity-700 via-mindful-700 to-calm-700 bg-clip-text text-transparent">
                Share, Connect, and Heal Together
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
                Join a supportive community where you can openly discuss mental health, 
                share experiences, and find resources in a safe, judgment-free environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-serenity-500 to-mindful-500 hover:from-serenity-600 hover:to-mindful-600 transition-all shadow-md hover:shadow-lg"
                >
                  Join The Community
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-serenity-200 text-serenity-700 hover:bg-serenity-50 dark:border-serenity-800 dark:text-serenity-300 dark:hover:bg-slate-800"
                >
                  Browse Discussions <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-tr from-serenity-500/20 to-mindful-500/20 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                      "Finding a community that understands has been life-changing."
                    </h2>
                    <p className="text-slate-700 dark:text-slate-200 italic">
                      — Sarah, MindTalk member for 2 years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-white dark:bg-slate-900">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mindful-700 to-calm-700 bg-clip-text text-transparent">
                A Safe Space for Mental Wellness
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Designed with your wellbeing in mind, our platform offers features that support 
                meaningful connections and personal growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 rounded-lg bg-serenity-100 dark:bg-serenity-900/50 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-serenity-600 dark:text-serenity-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Supportive Community
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Connect with others who understand your experiences in a 
                  moderated, respectful environment.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="w-12 h-12 rounded-lg bg-mindful-100 dark:bg-mindful-900/50 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-mindful-600 dark:text-mindful-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Anonymous Sharing
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Share your thoughts without revealing your identity, 
                  while still building meaningful connections.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 rounded-lg bg-calm-100 dark:bg-calm-900/50 flex items-center justify-center mb-4">
                  <HeartHandshake className="h-6 w-6 text-calm-600 dark:text-calm-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Expert Guidance
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access resources and insights from verified mental health 
                  professionals and wellness experts.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="w-12 h-12 rounded-lg bg-wellness-100 dark:bg-wellness-900/50 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-wellness-600 dark:text-wellness-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Wellness Activities
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Participate in guided exercises, challenges, and activities 
                  designed to support your mental wellbeing.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <div className="w-12 h-12 rounded-lg bg-support-100 dark:bg-support-900/50 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-support-600 dark:text-support-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  24/7 AI Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access immediate support through our AI assistant, 
                  offering resources and comfort when you need it most.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <div className="w-12 h-12 rounded-lg bg-healing-100 dark:bg-healing-900/50 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-healing-600 dark:text-healing-400" />
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
        <section className="py-20 px-4 bg-gradient-to-br from-serenity-50 to-mindful-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container max-w-5xl mx-auto">
            <div className="card-glass rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-serenity-700 to-mindful-700 bg-clip-text text-transparent">
                  Begin Your Wellness Journey Today
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
                  Join thousands of individuals supporting each other through 
                  life's challenges and celebrating its victories.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-serenity-500 to-mindful-500 hover:from-serenity-600 hover:to-mindful-600 transition-all shadow-md hover:shadow-lg"
                >
                  Join MindTalk — It's Free
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
