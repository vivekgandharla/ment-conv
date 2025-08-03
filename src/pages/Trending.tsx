
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Award
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
}

export default function Trending() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [trendingDiscussions, setTrendingDiscussions] = useState<TrendingDiscussion[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    setLoading(true);
    try {
      // Fetch trending discussions (most viewed, commented, and upvoted)
      const { data: discussions, error: discussionsError } = await supabase
        .from('discussions')
        .select(`
          *,
          author:profiles(display_name, avatar_url),
          category:categories(name, color)
        `)
        .order('view_count', { ascending: false })
        .order('comment_count', { ascending: false })
        .order('upvote_count', { ascending: false })
        .limit(4);

      if (discussionsError) throw discussionsError;

      // Fetch trending topics (categories with most discussions)
      const { data: topics, error: topicsError } = await supabase
        .from('categories')
        .select(`
          name,
          color,
          discussions!inner(id)
        `)
        .order('discussions.count', { ascending: false })
        .limit(10);

      if (topicsError) throw topicsError;

      setTrendingDiscussions(discussions || []);
      
      // Transform topics data
      const transformedTopics = topics?.map(topic => ({
        name: topic.name,
        count: topic.discussions?.length || 0,
        category: topic.name
      })) || [];

      setTrendingTopics(transformedTopics);
    } catch (error) {
      console.error('Error fetching trending data:', error);
      toast({
        title: "Error",
        description: "Failed to load trending data",
        variant: "destructive"
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
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-screen-400 flex items-center gap-2">
                <TrendingUp className="h-8 w-8" />
                Trending Now
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover what's popular in the MentConv community
              </p>
            </div>
            <Button asChild className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
              <Link to="/discussions">
                View All Discussions
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Trending Discussions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-green-screen-400">Trending Discussions</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : trendingDiscussions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No trending discussions yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start a discussion to see it here!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {trendingDiscussions.map((discussion, index) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        {/* Discussion Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            {discussion.category && (
                              <Badge 
                                className="text-white"
                                style={{ backgroundColor: discussion.category.color }}
                              >
                                {discussion.category.name}
                              </Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {formatTimeAgo(discussion.created_at)}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-green-screen-400 hover:text-green-screen-300">
                            {discussion.title}
                          </h3>
                          
                          <p className="text-muted-foreground line-clamp-2">
                            {discussion.content}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{formatNumber(discussion.view_count)} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{formatNumber(discussion.comment_count)} comments</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{formatNumber(discussion.upvote_count)} likes</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={discussion.author?.avatar_url || ''} />
                                <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                                  {getInitials(discussion.author?.display_name || 'U')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                {discussion.author?.display_name || 'Unknown'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center">
              <Button asChild variant="outline" className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50">
                <Link to="/discussions">
                  See More Discussions
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-screen-400">
                <BarChart className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.slice(0, 8).map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {topic.name}
                    </span>
                    <Badge variant="secondary" className="bg-green-screen-100 text-green-screen-400">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50">
                  <Link to="/discussions">
                    View All Topics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Join The Conversation */}
          <Card className="bg-gradient-to-br from-green-screen-50 to-green-screen-100 dark:from-green-screen-400/10 dark:to-green-screen-400/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-green-screen-200 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-screen-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-screen-400 mb-2">
                    Join The Conversation
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Share your experiences, ask questions, and connect with others who understand what you're going through.
                  </p>
                </div>
                <Button asChild className="w-full bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                  <Link to="/waitlist">
                    Join MentConv
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-screen-400">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-screen-400" />
                    <span className="text-sm">Active Members</span>
                  </div>
                  <span className="text-sm font-semibold">50K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-green-screen-400" />
                    <span className="text-sm">Discussions</span>
                  </div>
                  <span className="text-sm font-semibold">100K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-green-screen-400" />
                    <span className="text-sm">Resources</span>
                  </div>
                  <span className="text-sm font-semibold">500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-screen-400" />
                    <span className="text-sm">Experts</span>
                  </div>
                  <span className="text-sm font-semibold">200+</span>
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
}
