
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  TrendingUp, 
  MessageSquare, 
  Heart, 
  BarChart, 
  Eye, 
  Clock, 
  ChevronRight,
  Users,
  BookOpen,
  Award,
  Calendar,
  Flame,
  Star,
  Zap,
  TrendingDown,
  Activity
} from "lucide-react";

interface TrendingDiscussion {
  id: string;
  title: string;
  content: string;
  view_count: number;
  comment_count: number;
  upvote_count: number;
  downvote_count: number;
  created_at: string;
  author?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  category?: {
    name: string;
    color: string;
  };
}

interface TrendingTopic {
  name: string;
  count: number;
  category: string;
  growth: number;
}

interface TrendingResource {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  rating: number;
  review_count: number;
  view_count: number;
  created_at: string;
  author?: {
    display_name: string | null;
  };
}

interface TrendingExpert {
  id: string;
  display_name: string;
  avatar_url: string | null;
  profession: string;
  organization: string;
  experience_years: number;
  total_upvotes: number;
  discussions_count: number;
  verified_at: string;
}

export default function Trending() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [trendingDiscussions, setTrendingDiscussions] = useState<TrendingDiscussion[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [trendingResources, setTrendingResources] = useState<TrendingResource[]>([]);
  const [trendingExperts, setTrendingExperts] = useState<TrendingExpert[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('week');
  const [activeTab, setActiveTab] = useState('discussions');

  // Dummy data for showcase
  const dummyTrendingDiscussions: TrendingDiscussion[] = [
    {
      id: '1',
      title: 'How do you cope with anxiety?',
      content: 'I\'ve been struggling with anxiety lately and would love to hear how others manage it.',
      view_count: 2340,
      comment_count: 45,
      upvote_count: 156,
      downvote_count: 8,
      created_at: '2024-01-15T10:00:00Z',
      author: { display_name: 'Sarah M.', avatar_url: null },
      category: { name: 'Anxiety', color: '#FF6B6B' }
    },
    {
      id: '2',
      title: 'Daily mindfulness routine that works',
      content: 'I started a 10-minute daily mindfulness practice and it\'s been amazing for my mental health.',
      view_count: 1890,
      comment_count: 32,
      upvote_count: 123,
      downvote_count: 5,
      created_at: '2024-01-14T14:30:00Z',
      author: { display_name: 'Mike R.', avatar_url: null },
      category: { name: 'Self-Care', color: '#45B7D1' }
    },
    {
      id: '3',
      title: 'Anonymous: Feeling overwhelmed',
      content: 'I\'m feeling really overwhelmed with work and life right now. Just needed to get this off my chest.',
      view_count: 1670,
      comment_count: 28,
      upvote_count: 98,
      downvote_count: 3,
      created_at: '2024-01-13T09:15:00Z',
      author: { display_name: 'Anonymous', avatar_url: null },
      category: { name: 'Depression', color: '#4ECDC4' }
    },
    {
      id: '4',
      title: 'Tips for better sleep hygiene',
      content: 'What are your best tips for getting better sleep? I\'ve been struggling with insomnia.',
      view_count: 1450,
      comment_count: 38,
      upvote_count: 87,
      downvote_count: 4,
      created_at: '2024-01-12T16:45:00Z',
      author: { display_name: 'Lisa K.', avatar_url: null },
      category: { name: 'Wellness', color: '#96CEB4' }
    }
  ];

  const dummyTrendingTopics: TrendingTopic[] = [
    { name: 'Anxiety', count: 156, category: 'Mental Health', growth: 12 },
    { name: 'Depression', count: 134, category: 'Mental Health', growth: 8 },
    { name: 'Self-Care', count: 98, category: 'Wellness', growth: 15 },
    { name: 'Mindfulness', count: 87, category: 'Wellness', growth: 22 },
    { name: 'Relationships', count: 76, category: 'Social', growth: 5 },
    { name: 'Therapy', count: 65, category: 'Professional', growth: 18 }
  ];

  const dummyTrendingResources: TrendingResource[] = [
    {
      id: '1',
      title: 'Understanding and Managing Anxiety',
      description: 'A comprehensive guide explaining anxiety and offering practical strategies.',
      resource_type: 'article',
      rating: 4.8,
      review_count: 89,
      view_count: 2340,
      created_at: '2024-01-10T14:30:00Z',
      author: { display_name: 'Dr. Sarah Johnson' }
    },
    {
      id: '2',
      title: 'Mindfulness Meditation for Beginners',
      description: 'Learn the basics of mindfulness meditation with guided sessions.',
      resource_type: 'video',
      rating: 4.9,
      review_count: 156,
      view_count: 1890,
      created_at: '2024-01-08T11:20:00Z',
      author: { display_name: 'Mindful Living' }
    },
    {
      id: '3',
      title: 'Cognitive Behavioral Therapy Workbook',
      description: 'A practical workbook with exercises for managing negative thoughts.',
      resource_type: 'exercise',
      rating: 4.7,
      review_count: 67,
      view_count: 1670,
      created_at: '2024-01-05T09:15:00Z',
      author: { display_name: 'Therapy Resources' }
    }
  ];

  const dummyTrendingExperts: TrendingExpert[] = [
    {
      id: '1',
      display_name: 'Dr. Sarah Johnson',
      avatar_url: null,
      profession: 'Clinical Psychologist',
      organization: 'Mental Health Institute',
      experience_years: 8,
      total_upvotes: 2340,
      discussions_count: 45,
      verified_at: '2024-01-10T14:30:00Z'
    },
    {
      id: '2',
      display_name: 'Michael Chen',
      avatar_url: null,
      profession: 'Licensed Therapist',
      organization: 'Wellness Center',
      experience_years: 5,
      total_upvotes: 1890,
      discussions_count: 32,
      verified_at: '2024-01-08T11:20:00Z'
    },
    {
      id: '3',
      display_name: 'Dr. Emily Rodriguez',
      avatar_url: null,
      profession: 'Psychiatrist',
      organization: 'Community Health',
      experience_years: 12,
      total_upvotes: 1670,
      discussions_count: 28,
      verified_at: '2024-01-05T09:15:00Z'
    }
  ];

  useEffect(() => {
    fetchTrendingData();
  }, [timeFilter]);

  const fetchTrendingData = async () => {
    setLoading(true);
    try {
      // For now, use dummy data with time filtering simulation
      setTrendingDiscussions(dummyTrendingDiscussions);
      setTrendingTopics(dummyTrendingTopics);
      setTrendingResources(dummyTrendingResources);
      setTrendingExperts(dummyTrendingExperts);
    } catch (error) {
      console.error('Error fetching trending data:', error);
      toast({
        title: "Error",
        description: "Failed to load trending data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-slate-500" />;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Activity className="h-4 w-4" />;
      case 'podcast': return <Users className="h-4 w-4" />;
      case 'exercise': return <Zap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-green-screen-400">Trending</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Discover what's popular in the mental health community
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Trending Topics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {trendingTopics.slice(0, 6).map((topic, index) => (
                    <div key={index} className="text-center p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {getGrowthIcon(topic.growth)}
                        <span className="text-xs font-medium">{topic.growth}%</span>
                      </div>
                      <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {topic.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatNumber(topic.count)} discussions
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different trending content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="experts">Experts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendingDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Badge 
                            className="text-xs"
                            style={{ backgroundColor: discussion.category?.color + '20', color: discussion.category?.color, borderColor: discussion.category?.color + '40' }}
                          >
                            {discussion.category?.name}
                          </Badge>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {formatTimeAgo(discussion.created_at)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 hover:text-green-screen-400 transition-colors">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={discussion.author?.avatar_url || ''} />
                                <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                                  {getInitials(discussion.author?.display_name || 'U')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{discussion.author?.display_name || 'Anonymous'}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{formatNumber(discussion.view_count)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{formatNumber(discussion.comment_count)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{formatNumber(discussion.upvote_count)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getResourceIcon(resource.resource_type)}
                            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                              {resource.resource_type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                          <span>by {resource.author?.display_name}</span>
                          <div className="flex items-center space-x-2">
                            <span>{formatNumber(resource.view_count)} views</span>
                            <span>•</span>
                            <span>{formatNumber(resource.review_count)} reviews</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experts" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingExperts.map((expert) => (
                    <Card key={expert.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={expert.avatar_url || ''} />
                            <AvatarFallback className="bg-green-screen-100 text-green-screen-400">
                              {getInitials(expert.display_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                                {expert.display_name}
                              </h3>
                              <Award className="h-4 w-4 text-green-screen-400" />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {expert.profession} • {expert.organization}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-screen-400">
                              {formatNumber(expert.total_upvotes)}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Upvotes
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-screen-400">
                              {expert.discussions_count}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Discussions
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-screen-400">
                              {expert.experience_years}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Years
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Active Members</span>
                          <span className="font-semibold text-green-screen-400">+12%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New Discussions</span>
                          <span className="font-semibold text-green-screen-400">+8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Resource Shares</span>
                          <span className="font-semibold text-green-screen-400">+15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {trendingTopics.slice(0, 5).map((topic, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{topic.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-green-screen-400 h-2 rounded-full"
                                  style={{ width: `${(topic.count / trendingTopics[0].count) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">{topic.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
