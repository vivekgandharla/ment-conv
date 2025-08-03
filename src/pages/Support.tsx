
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Mail, MessageSquare, Phone, Clock, HeartHandshake, AlertTriangle, CheckCircle, Users, Shield } from "lucide-react";

const Support: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user?.id || null,
          email: formData.email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
          category: formData.category,
          priority: formData.priority
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Support ticket created",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error creating support ticket:', error);
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-green-screen-50 border-green-screen-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-screen-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-green-screen-400" />
                </div>
                <CardTitle className="text-green-screen-400">Community Support</CardTitle>
                <CardDescription>
                  Connect with others who understand what you're going through
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400" asChild>
                  <a href="/discussions">Join Discussions</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-screen-50 border-green-screen-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-screen-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-screen-400" />
                </div>
                <CardTitle className="text-green-screen-400">Crisis Support</CardTitle>
                <CardDescription>
                  Immediate help and resources for crisis situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">National Crisis Hotlines:</p>
                  <p>988 - Suicide & Crisis Lifeline</p>
                  <p>1-800-273-8255 - National Suicide Prevention</p>
                  <p>Text HOME to 741741 - Crisis Text Line</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-screen-50 border-green-screen-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-screen-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-screen-400" />
                </div>
                <CardTitle className="text-green-screen-400">Professional Help</CardTitle>
                <CardDescription>
                  Find licensed therapists and mental health professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400" asChild>
                  <a href="/resources">Browse Resources</a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {!isSubmitted ? (
              <Card className="bg-white dark:bg-green-950 border-green-screen-100">
                <CardHeader>
                  <CardTitle className="text-green-screen-400">Contact Support Team</CardTitle>
                  <CardDescription>
                    Send us a message and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                          className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                        />
                      </div>
                      
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                        required
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your issue or question in detail..."
                        rows={6}
                        required
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message || !formData.category}
                      className="w-full bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-green-950 border-green-screen-100">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-screen-400">Message Sent Successfully</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We'll review your message and get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {/* Quick Help */}
              <Card className="bg-green-screen-50 border-green-screen-100">
                <CardHeader>
                  <CardTitle className="text-green-screen-400">Quick Help</CardTitle>
                  <CardDescription>
                    Common questions and quick solutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-screen-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-green-screen-400">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">How do I join discussions?</h4>
                        <p className="text-sm text-muted-foreground">
                          Simply navigate to the Discussions page and start participating. You can post anonymously if you prefer.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-screen-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-green-screen-400">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Is my information private?</h4>
                        <p className="text-sm text-muted-foreground">
                          Yes, we take privacy seriously. You can post anonymously and we never share your personal information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-screen-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-green-screen-400">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">How do I report inappropriate content?</h4>
                        <p className="text-sm text-muted-foreground">
                          Use the report button on any post or comment. Our moderators review all reports within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-green-screen-50 border-green-screen-100">
                <CardHeader>
                  <CardTitle className="text-green-screen-400">Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-screen-400" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@mentconv.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-screen-400" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-green-screen-400" />
                    <div>
                      <p className="font-medium">Community Hours</p>
                      <p className="text-sm text-muted-foreground">24/7 active community</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
