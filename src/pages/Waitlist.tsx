
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Leaf } from "lucide-react";

const Waitlist: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    interest: "",
    source: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          email: formData.email,
          name: formData.name || null,
          phone: formData.phone || null,
          interest: formData.interest || null,
          source: formData.source || null
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
                    <span className="font-medium">24/7 community support</span> from peers and professionals
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              {!isSubmitted ? (
                <div className="bg-white dark:bg-green-950 rounded-2xl shadow-xl p-8 border border-green-200 dark:border-green-800">
                  <h2 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-200">
                    Join the Waitlist
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email address"
                        required
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest">Primary Interest</Label>
                      <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                        <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                          <SelectValue placeholder="Select your primary interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anxiety">Anxiety & Stress</SelectItem>
                          <SelectItem value="depression">Depression</SelectItem>
                          <SelectItem value="mindfulness">Mindfulness & Meditation</SelectItem>
                          <SelectItem value="self-care">Self-Care & Wellness</SelectItem>
                          <SelectItem value="relationships">Relationships</SelectItem>
                          <SelectItem value="professional">Professional Development</SelectItem>
                          <SelectItem value="general">General Mental Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="source">How did you hear about us?</Label>
                      <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                        <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                          <SelectValue placeholder="Select how you heard about us" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="friend">Friend/Family</SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="advertisement">Advertisement</SelectItem>
                          <SelectItem value="blog">Blog/Article</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || !formData.email}
                      className="w-full waitlist-btn text-white shadow-md hover:shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Joining Waitlist...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </form>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
                    We respect your privacy. Your information will only be used to notify you about our launch.
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-green-950 rounded-2xl shadow-xl p-8 border border-green-200 dark:border-green-800 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
                    You're on the list!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Thank you for joining our waitlist. We'll notify you as soon as MentConv launches and you'll be among the first to experience our community.
                  </p>
                  <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <p>What happens next?</p>
                    <ul className="space-y-1">
                      <li>• We'll send you updates about our progress</li>
                      <li>• You'll get early access when we launch</li>
                      <li>• We'll notify you about special launch events</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Waitlist;
