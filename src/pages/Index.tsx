
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Leaf,
  Heart,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  Video,
  Headphones,
  Download,
  Play,
  Quote
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

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Member for 2 years",
      content: "Finding a community that understands has been life-changing. The support I've received here has helped me through my darkest moments.",
      avatar: "SM",
      rating: 5
    },
    {
      name: "Alex K.",
      role: "Anxiety Support Group",
      content: "The anonymous sharing feature allowed me to open up without fear. I've learned so many coping strategies from others.",
      avatar: "AK",
      rating: 5
    },
    {
      name: "Maria L.",
      role: "Depression Recovery",
      content: "The expert resources and guided practices have been invaluable in my recovery journey. This platform truly cares about mental health.",
      avatar: "ML",
      rating: 5
    },
    {
      name: "David R.",
      role: "Therapist & Member",
      content: "As a mental health professional, I appreciate how this platform bridges the gap between professional support and peer connection.",
      avatar: "DR",
      rating: 5
    },
    {
      name: "Emma T.",
      role: "New Member",
      content: "I was hesitant to join, but the anonymous features made me feel safe. Now I can't imagine my recovery journey without this community.",
      avatar: "ET",
      rating: 5
    },
    {
      name: "James P.",
      role: "Wellness Coach",
      content: "The resources here are top-notch. I often recommend this platform to my clients as a supplement to professional therapy.",
      avatar: "JP",
      rating: 5
    }
  ];

  const recentDiscussions = [
    {
      title: "How do you cope with anxiety?",
      author: "Sarah M.",
      replies: 8,
      category: "Anxiety",
      timeAgo: "2 hours ago"
    },
    {
      title: "Daily mindfulness routine that works",
      author: "Mike R.",
      replies: 12,
      category: "Self-Care",
      timeAgo: "4 hours ago"
    },
    {
      title: "Anonymous: Feeling overwhelmed",
      author: "Anonymous",
      replies: 15,
      category: "Depression",
      timeAgo: "6 hours ago"
    },
    {
      title: "Tips for better sleep hygiene",
      author: "Lisa K.",
      replies: 6,
      category: "Wellness",
      timeAgo: "8 hours ago"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Join the Community",
      description: "Sign up for free and create your profile. You can browse anonymously or connect with others.",
      icon: <Users className="h-8 w-8" />
    },
    {
      step: "02",
      title: "Share Your Story",
      description: "Post discussions anonymously or with your identity. Share experiences, ask questions, or offer support.",
      icon: <MessageSquare className="h-8 w-8" />
    },
    {
      step: "03",
      title: "Connect & Support",
      description: "Engage with others through comments, upvotes, and resource sharing. Build meaningful connections.",
      icon: <Heart className="h-8 w-8" />
    },
    {
      step: "04",
      title: "Access Resources",
      description: "Discover expert-curated resources, exercises, and tools to support your mental health journey.",
      icon: <BookOpen className="h-8 w-8" />
    }
  ];

  const statistics = [
    { number: "50K+", label: "Active Members", icon: <Users className="h-6 w-6" /> },
    { number: "100K+", label: "Discussions", icon: <MessageSquare className="h-6 w-6" /> },
    { number: "500+", label: "Expert Resources", icon: <BookOpen className="h-6 w-6" /> },
    { number: "24/7", label: "Support Available", icon: <Heart className="h-6 w-6" /> }
  ];

  const featuredResources = [
    {
      title: "Understanding and Managing Anxiety",
      type: "Guide",
      category: "Anxiety",
      description: "A comprehensive guide explaining anxiety and offering practical strategies for managing symptoms.",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-green-screen-100"
    },
    {
      title: "Therapeutic Podcast Series",
      type: "Podcast",
      category: "Depression",
      description: "A six-part series featuring therapists and individuals sharing stories and strategies.",
      icon: <Headphones className="h-8 w-8" />,
      color: "bg-green-screen-200"
    }
  ];

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
            <Leaf className="text-green-screen-100/20 dark:text-green-screen-200/10" style={{ width: `${20 + Math.random() * 30}px` }} />
          </div>
        ))}
      </div>
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-screen-50 to-white dark:from-green-screen-400/10 dark:to-green-screen-400/5">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-green-screen-100 text-green-screen-400 hover:bg-green-screen-200">
                Mental Health Community
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-green-screen-400">
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
                  className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50 dark:border-green-screen-200 dark:text-green-screen-200 dark:hover:bg-green-screen-400/10"
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
                <div className="absolute inset-0 bg-gradient-to-tr from-green-screen-100/30 to-green-screen-200/30 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <Quote className="w-12 h-12 mx-auto mb-4 text-green-screen-300" />
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

        {/* Statistics Section */}
        <section className="py-16 px-4 bg-white dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-green-screen-400 mb-2">{stat.number}</div>
                  <div className="text-slate-600 dark:text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-green-screen-50/50 dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
                A Safe Space for Mental Wellness
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Designed with your wellbeing in mind, our platform offers features that support 
                meaningful connections and personal growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-screen-400" />
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
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-screen-400" />
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
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-screen-400" />
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
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-screen-400" />
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
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-green-screen-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  24/7 Community Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access immediate support through our community, 
                  offering resources and comfort when you need it most.
                </p>
              </div>
              
              <div className="card-glass rounded-2xl p-6 animate-fade-in hover-lift" style={{ animationDelay: "600ms" }}>
                <div className="w-12 h-12 rounded-lg bg-green-screen-100 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-green-screen-400" />
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

        {/* Featured Resources Section */}
        <section className="py-20 px-4 bg-white dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
                Featured Resources
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Access our collection of trusted resources to support your mental health journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredResources.map((resource, index) => (
                <Card key={index} className="overflow-hidden animate-fade-in hover-lift" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-0">
                    <div className={`${resource.color} p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-white/20 text-white border-0">
                          {resource.category}
                        </Badge>
                        <div className="text-white/80">{resource.type}</div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="text-white/90">
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                          <p className="text-white/80 mb-4">{resource.description}</p>
                          <Button className="bg-white text-green-screen-400 hover:bg-white/90">
                            {resource.type === 'Podcast' ? 'Listen Now' : 'Read Guide'}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-green-screen-50/50 dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
                What Our Community Says
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Real stories from real people who found support and healing in our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="animate-fade-in hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-green-screen-300 mb-4" />
                    <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-white dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Getting started with MentConv is simple. Join our community and begin your wellness journey in just a few steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-screen-200 flex items-center justify-center text-green-screen-400 font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Discussions Section */}
        <section className="py-20 px-4 bg-green-screen-50/50 dark:bg-green-screen-400/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
                Recent Community Discussions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                See what's happening in our community right now. Join the conversation and share your thoughts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentDiscussions.map((discussion, index) => (
                <Card key={index} className="animate-fade-in hover-lift cursor-pointer" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="text-xs" style={{ backgroundColor: '#4ECDC4', color: 'white' }}>
                        {discussion.category}
                      </Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {discussion.timeAgo}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 hover:text-green-screen-400 transition-colors">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>by {discussion.author}</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50"
                asChild
              >
                <Link to="/discussions">
                  View All Discussions <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-screen-50 to-green-screen-100 dark:from-green-screen-400/10 dark:to-green-screen-400/5">
          <div className="container max-w-5xl mx-auto">
            <div className="card-glass rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-screen-400">
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
