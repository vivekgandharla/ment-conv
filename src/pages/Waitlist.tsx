
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Leaf } from "lucide-react";

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4 overflow-hidden relative">
        {/* Animated falling leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute falling-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            >
              <Leaf className="text-green-500/20 dark:text-green-500/10" style={{ width: `${20 + Math.random() * 30}px` }} />
            </div>
          ))}
        </div>
      
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium mb-4">
                Coming Soon
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                Join the MentConv Waitlist
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Be among the first to experience a safe, supportive community dedicated to mental health discussions and resources. 
                Sign up now to get early access when we launch.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Safe, moderated discussions</span> about mental health topics
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Anonymous posting</span> for sharing without revealing your identity
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Expert-verified resources</span> and support tools
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">24/7 AI support</span> for guidance when you need it most
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="card-glass rounded-2xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      You're on the list!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Thank you for joining our waitlist. We'll notify you when MentConv launches.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Sign up another email
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                      Get Early Access
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-green-800 rounded-md bg-white dark:bg-green-950/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-green-800 rounded-md bg-white dark:bg-green-950/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Why are you interested in MentConv? (Optional)
                        </label>
                        <textarea
                          id="reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-green-800 rounded-md bg-white dark:bg-green-950/50 focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                          placeholder="Tell us what you're hoping to find or experience on MentConv..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full waitlist-btn text-white py-6 text-lg transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Join the Waitlist"}
                      </Button>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                        We'll never share your information with third parties.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Waitlist;
