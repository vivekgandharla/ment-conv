
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Mail, MessageSquare, Phone, Clock, HeartHandshake } from "lucide-react";

const Support: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
        duration: 3000,
      });
      setName("");
      setEmail("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium mb-4">
              24/7 Support Available
            </span>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              We're Here For You
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Whether you're going through a difficult time or just need someone to talk to,
              our support team and community are here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-glass rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
                Get In Touch
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Your Name
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
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-green-800 rounded-md bg-white dark:bg-green-950/50 focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                    placeholder="How can we help you today?"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            <div className="card-glass rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
                Support Resources
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                      Crisis Hotline
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">
                      Available 24/7 for immediate support
                    </p>
                    <a href="tel:1-800-273-8255" className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">
                      1-800-273-8255
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                      Text Support
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">
                      Text HOME to 741741 for crisis support
                    </p>
                    <a href="sms:741741" className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">
                      Text HOME to 741741
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                      Support Groups
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">
                      Join one of our moderated online support groups
                    </p>
                    <a href="/groups" className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">
                      View Available Groups
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                      Response Time
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      We aim to respond to all inquiries within 24 hours. For immediate support, 
                      please use our crisis hotline or text support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8 text-center animate-fade-in">
            <Heart className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Need Immediate Help?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
              If you're experiencing a mental health emergency or having thoughts of harming yourself,
              please call or text the National Suicide Prevention Lifeline immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-green-600 hover:bg-green-500 text-white flex items-center gap-2"
                asChild
              >
                <a href="tel:1-800-273-8255">
                  <Phone className="h-4 w-4" />
                  Call 1-800-273-8255
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20 flex items-center gap-2"
                asChild
              >
                <a href="mailto:support@mentconv.com">
                  <Mail className="h-4 w-4" />
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
