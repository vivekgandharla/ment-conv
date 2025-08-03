
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageSquare, Heart, BarChart, Eye, Clock } from "lucide-react";

// Mock data
const trendingTopics = [
  { id: 1, name: "Anxiety Management", count: 324, category: "Anxiety", variant: "serenity" as const },
  { id: 2, name: "Mindfulness Practices", count: 287, category: "Self-Care", variant: "calm" as const },
  { id: 3, name: "Depression Support", count: 253, category: "Depression", variant: "mindful" as const },
  { id: 4, name: "Work-Life Balance", count: 189, category: "Stress", variant: "wellness" as const },
  { id: 5, name: "Healthy Relationships", count: 142, category: "Relationships", variant: "support" as const },
];

const trendingDiscussions = [
  {
    id: 1,
    title: "How I overcame social anxiety through gradual exposure",
    excerpt: "After years of avoiding social situations, I started a journey of gradual exposure that changed my life. Here's my story and the techniques that worked for me...",
    author: "RecoveringIntrovert",
    postedAt: "2 days ago",
    views: 2856,
    comments: 134,
    likes: 348,
    category: "Anxiety",
    variant: "serenity" as const
  },
  {
    id: 2,
    title: "Daily mindfulness practices that take less than 5 minutes",
    excerpt: "We all have busy lives, but even a few minutes of mindfulness can make a huge difference. These are the quick practices I incorporate throughout my day...",
    author: "MindfulMoments",
    postedAt: "3 days ago",
    views: 2413,
    comments: 92,
    likes: 273,
    category: "Self-Care",
    variant: "calm" as const
  },
  {
    id: 3,
    title: "Supporting a partner with depression: what I've learned",
    excerpt: "When my partner was diagnosed with depression, I had no idea how to help. Over the years, I've learned some important lessons about support, boundaries, and self-care...",
    author: "SupportiveSpouse",
    postedAt: "1 week ago",
    views: 1987,
    comments: 156,
    likes: 412,
    category: "Depression",
    variant: "mindful" as const
  },
  {
    id: 4,
    title: "How I restructured my work life to prioritize mental health",
    excerpt: "After burning out twice, I realized I needed to completely rethink my approach to work. Here's how I created boundaries and rebuilt my career with mental health as a priority...",
    author: "BalancedProfessional",
    postedAt: "5 days ago",
    views: 1754,
    comments: 87,
    likes: 231,
    category: "Stress",
    variant: "wellness" as const
  },
];

const Trending: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                  Trending Now
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Discover what's popular in the MentConv community
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
                asChild
              >
                <Link to="/discussions">
                  View All Discussions
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Trending Discussions
              </h2>
              
              {trendingDiscussions.map((discussion, index) => (
                <div 
                  key={discussion.id} 
                  className="card-glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={discussion.variant}>
                      {discussion.category}
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{discussion.views}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        <span>{discussion.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>{discussion.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                    <Link to={`/discussions/${discussion.id}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {discussion.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {discussion.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <span className="text-xs font-medium text-green-800 dark:text-green-300">
                          {discussion.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {discussion.author}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{discussion.postedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-8">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <Link to="/discussions">
                    See More Discussions
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    Trending Topics
                  </h2>
                  <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={topic.variant} className="min-w-[80px] justify-center">
                          {topic.category}
                        </Badge>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                          {topic.name}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-green-800">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
                  >
                    View All Topics
                  </Button>
                </div>
              </div>
              
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Join The Conversation
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Share your experiences, ask questions, and connect with others who understand what you're going through.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white"
                  asChild
                >
                  <Link to="/waitlist">
                    Join MentConv
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
