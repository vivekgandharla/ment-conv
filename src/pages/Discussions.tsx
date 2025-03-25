
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryList from "@/components/discussions/CategoryList";
import DiscussionCard from "@/components/discussions/DiscussionCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

// Mock data
const categories = [
  { id: "anxiety", name: "Anxiety", color: "serenity" as const, count: 128 },
  { id: "depression", name: "Depression", color: "mindful" as const, count: 95 },
  { id: "self-care", name: "Self Care", color: "calm" as const, count: 73 },
  { id: "stress", name: "Stress", color: "wellness" as const, count: 62 },
  { id: "relationships", name: "Relationships", color: "support" as const, count: 47 },
  { id: "trauma", name: "Trauma", color: "healing" as const, count: 39 },
];

const discussions = [
  {
    id: "1",
    title: "How do you manage anxiety in social situations?",
    excerpt: "I've been struggling with social anxiety for years, and it's been getting worse lately. I feel like I can't breathe when I'm in crowded places or meeting new people. Has anyone found effective strategies that help with this?",
    author: {
      name: "AlexJ",
      isVerified: false,
    },
    postedAt: "3 hours ago",
    category: {
      name: "Anxiety",
      color: "serenity" as const,
    },
    commentCount: 24,
    likeCount: 18,
  },
  {
    id: "2",
    title: "Practicing gratitude changed my perspective",
    excerpt: "I wanted to share how starting a daily gratitude practice has helped with my depression. Even on my worst days, finding three things to be grateful for has slowly shifted how I see the world...",
    author: {
      name: "MindfulMegan",
      isVerified: true,
    },
    postedAt: "Yesterday",
    category: {
      name: "Depression",
      color: "mindful" as const,
    },
    commentCount: 42,
    likeCount: 87,
  },
  {
    id: "3",
    title: "Need advice for setting boundaries with family",
    excerpt: "I'm struggling to set healthy boundaries with certain family members who don't understand my mental health needs. Every interaction leaves me drained. How do you handle family who dismiss mental health concerns?",
    author: {
      name: "Anonymous",
    },
    postedAt: "2 days ago",
    category: {
      name: "Relationships",
      color: "support" as const,
    },
    commentCount: 31,
    likeCount: 26,
    isAnonymous: true,
  },
  {
    id: "4",
    title: "Meditation techniques for beginners with racing thoughts",
    excerpt: "I've tried meditation several times but my mind races constantly. Are there specific techniques or guided meditations that work better for people who struggle with an overactive mind?",
    author: {
      name: "CalmSeeker",
    },
    postedAt: "3 days ago",
    category: {
      name: "Self Care",
      color: "calm" as const,
    },
    commentCount: 19,
    likeCount: 34,
  },
  {
    id: "5",
    title: "Coping with workplace burnout and stress",
    excerpt: "The past few months at work have been incredibly stressful, and I think I'm experiencing burnout. I'm irritable, exhausted, and dreading each workday. Has anyone successfully navigated this while keeping their job?",
    author: {
      name: "WorkLifeBalance",
    },
    postedAt: "4 days ago",
    category: {
      name: "Stress",
      color: "wellness" as const,
    },
    commentCount: 38,
    likeCount: 41,
  },
  {
    id: "6",
    title: "Resources for processing childhood trauma",
    excerpt: "I've recently started therapy and realized how much childhood experiences have shaped my adult anxiety and depression. Looking for book recommendations or resources that others have found helpful.",
    author: {
      name: "HealingJourney",
    },
    postedAt: "1 week ago",
    category: {
      name: "Trauma",
      color: "healing" as const,
    },
    commentCount: 27,
    likeCount: 52,
  },
];

const Discussions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredDiscussions = selectedCategory 
    ? discussions.filter(d => d.category.name.toLowerCase() === selectedCategory)
    : discussions;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                Discussions
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Join the conversation and share your experiences
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-1"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-1"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button
                className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 transition-all shadow-md hover:shadow-lg flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <span>New Discussion</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="card-glass rounded-2xl p-5 sticky top-24 animate-fade-in">
                <CategoryList
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <DiscussionCard 
                  key={discussion.id} 
                  discussion={discussion} 
                  className={`animate-fade-in delay-${index * 100}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discussions;
