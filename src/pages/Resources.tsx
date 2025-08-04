
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { 
  BookOpen, 
  Play, 
  Headphones, 
  Dumbbell, 
  Book, 
  ExternalLink,
  Search,
  Filter,
  Star,
  Eye,
  Heart,
  Share2,
  Calendar,
  Clock,
  User,
  Award,
  TrendingUp,
  Bookmark,
  BookmarkPlus
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string | null;
  resource_type: 'article' | 'video' | 'podcast' | 'exercise' | 'book' | 'link';
  category_id: string | null;
  author_id: string | null;
  rating: number | null;
  rating_count: number;
  view_count: number;
  is_approved: boolean;
  tags: string[] | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    color: string;
  };
  author?: {
    display_name: string | null;
  };
}

interface Category {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

// Dummy data for resources
const dummyResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    description: 'A comprehensive guide to understanding anxiety disorders, their symptoms, and effective coping strategies.',
    url: 'https://example.com/anxiety-guide',
    resource_type: 'article',
    category_id: '1',
    author_id: '1',
    rating: 4.8,
    rating_count: 156,
    view_count: 2340,
    is_approved: true,
    tags: ['anxiety', 'mental-health', 'coping-strategies'],
    difficulty_level: 'beginner',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    category: { name: 'Anxiety', color: '#EF4444' },
    author: { display_name: 'Dr. Sarah Johnson' }
  },
  {
    id: '2',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Learn the basics of mindfulness meditation with guided sessions and practical tips for daily practice.',
    url: 'https://example.com/mindfulness-course',
    resource_type: 'video',
    category_id: '5',
    author_id: '2',
    rating: 4.9,
    rating_count: 89,
    view_count: 1890,
    is_approved: true,
    tags: ['meditation', 'mindfulness', 'stress-relief'],
    difficulty_level: 'beginner',
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    category: { name: 'Mindfulness', color: '#06B6D4' },
    author: { display_name: 'Mindful Living Institute' }
  },
  {
    id: '3',
    title: 'The Science of Sleep and Mental Health',
    description: 'Explore the connection between sleep quality and mental health, with practical tips for better sleep hygiene.',
    url: 'https://example.com/sleep-science',
    resource_type: 'podcast',
    category_id: '3',
    author_id: '3',
    rating: 4.7,
    rating_count: 203,
    view_count: 3120,
    is_approved: true,
    tags: ['sleep', 'mental-health', 'wellness'],
    difficulty_level: 'intermediate',
    created_at: '2024-01-08T09:15:00Z',
    updated_at: '2024-01-08T09:15:00Z',
    category: { name: 'Depression', color: '#3B82F6' },
    author: { display_name: 'Mental Health Today' }
  },
  {
    id: '4',
    title: 'Daily Self-Care Exercises',
    description: 'A collection of simple self-care exercises you can do at home to improve your mental well-being.',
    url: 'https://example.com/self-care-exercises',
    resource_type: 'exercise',
    category_id: '4',
    author_id: '4',
    rating: 4.6,
    rating_count: 134,
    view_count: 2150,
    is_approved: true,
    tags: ['self-care', 'exercises', 'wellness'],
    difficulty_level: 'beginner',
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-12T16:45:00Z',
    category: { name: 'Self-Care', color: '#8B5CF6' },
    author: { display_name: 'Wellness Coach Maria' }
  },
  {
    id: '5',
    title: 'Cognitive Behavioral Therapy Workbook',
    description: 'A practical workbook introducing CBT techniques for managing negative thoughts and behaviors.',
    url: 'https://example.com/cbt-workbook',
    resource_type: 'book',
    category_id: '2',
    author_id: '5',
    rating: 4.9,
    rating_count: 278,
    view_count: 4560,
    is_approved: true,
    tags: ['cbt', 'therapy', 'workbook'],
    difficulty_level: 'intermediate',
    created_at: '2024-01-05T11:20:00Z',
    updated_at: '2024-01-05T11:20:00Z',
    category: { name: 'Anxiety', color: '#EF4444' },
    author: { display_name: 'Dr. Michael Chen' }
  },
  {
    id: '6',
    title: 'Crisis Helpline Directory',
    description: 'A comprehensive directory of mental health crisis helplines and emergency resources.',
    url: 'https://example.com/crisis-helplines',
    resource_type: 'link',
    category_id: '6',
    author_id: '6',
    rating: 4.8,
    rating_count: 45,
    view_count: 890,
    is_approved: true,
    tags: ['crisis', 'helpline', 'emergency'],
    difficulty_level: 'beginner',
    created_at: '2024-01-20T13:00:00Z',
    updated_at: '2024-01-20T13:00:00Z',
    category: { name: 'Support', color: '#F59E0B' },
    author: { display_name: 'Mental Health Foundation' }
  },
  {
    id: '7',
    title: 'Advanced Depression Management Techniques',
    description: 'Advanced strategies for managing depression, including professional treatment approaches.',
    url: 'https://example.com/depression-advanced',
    resource_type: 'article',
    category_id: '3',
    author_id: '7',
    rating: 4.7,
    rating_count: 167,
    view_count: 2890,
    is_approved: true,
    tags: ['depression', 'advanced', 'treatment'],
    difficulty_level: 'advanced',
    created_at: '2024-01-18T15:30:00Z',
    updated_at: '2024-01-18T15:30:00Z',
    category: { name: 'Depression', color: '#3B82F6' },
    author: { display_name: 'Dr. Emily Rodriguez' }
  },
  {
    id: '8',
    title: 'Stress Management Through Exercise',
    description: 'Learn how physical exercise can help manage stress and improve mental health outcomes.',
    url: 'https://example.com/exercise-stress',
    resource_type: 'video',
    category_id: '4',
    author_id: '8',
    rating: 4.5,
    rating_count: 98,
    view_count: 1670,
    is_approved: true,
    tags: ['exercise', 'stress', 'physical-health'],
    difficulty_level: 'intermediate',
    created_at: '2024-01-14T12:00:00Z',
    updated_at: '2024-01-14T12:00:00Z',
    category: { name: 'Self-Care', color: '#8B5CF6' },
    author: { display_name: 'Fitness & Wellness Pro' }
  }
];

export default function Resources() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(dummyResources);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-5 h-5" />;
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'podcast':
        return <Headphones className="w-5 h-5" />;
      case 'exercise':
        return <Dumbbell className="w-5 h-5" />;
      case 'book':
        return <Book className="w-5 h-5" />;
      case 'link':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getDifficultyBadge = (difficulty: string | null) => {
    if (!difficulty) return null;
    
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[difficulty as keyof typeof colors]}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Badge>
    );
  };

  const handleBookmark = (resourceId: string) => {
    if (bookmarkedResources.includes(resourceId)) {
      setBookmarkedResources(bookmarkedResources.filter(id => id !== resourceId));
      toast({
        title: "Removed from bookmarks",
        description: "Resource removed from your bookmarks",
      });
    } else {
      setBookmarkedResources([...bookmarkedResources, resourceId]);
      toast({
        title: "Added to bookmarks",
        description: "Resource added to your bookmarks",
      });
    }
  };

  const handleShare = (resource: Resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: resource.url || window.location.href
      });
    } else {
      navigator.clipboard.writeText(resource.url || window.location.href);
      toast({
        title: "Link copied",
        description: "Resource link copied to clipboard",
      });
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category_id === selectedCategory;
    const matchesType = selectedType === 'all' || resource.resource_type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty_level === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'views':
        return b.view_count - a.view_count;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default:
        return 0;
    }
  });

  const getResourceTypeLabel = (type: string) => {
    const labels = {
      article: 'Article',
      video: 'Video',
      podcast: 'Podcast',
      exercise: 'Exercise',
      book: 'Book',
      link: 'Link'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-screen-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-green-screen-400" />
          </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-screen-400">Mental Health Resources</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover curated resources to support your mental health journey. From articles and videos to exercises and tools.
                </p>
              </div>
            </div>
            
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="podcast">Podcasts</SelectItem>
                  <SelectItem value="exercise">Exercises</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="link">Links</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-screen-100 rounded-lg">
                      {getResourceIcon(resource.resource_type)}
                </div>
                    <div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {getResourceTypeLabel(resource.resource_type)}
                    </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(resource.id)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {bookmarkedResources.includes(resource.id) ? (
                        <Bookmark className="w-4 h-4 text-green-screen-400 fill-current" />
                      ) : (
                        <BookmarkPlus className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(resource)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Share2 className="w-4 h-4" />
                  </Button>
            </div>
          </div>
          
                <div className="space-y-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-green-screen-400 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {resource.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Tags and Difficulty */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags?.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                  </Badge>
                      ))}
                      {resource.tags && resource.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 2}
                  </Badge>
                      )}
                </div>
                    {getDifficultyBadge(resource.difficulty_level)}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{resource.rating?.toFixed(1) || 'N/A'}</span>
                        <span>({resource.rating_count})</span>
                    </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{resource.view_count.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
                  {/* Author and Category */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {resource.author?.display_name || 'Unknown'}
                      </span>
                    </div>
                    {resource.category && (
                      <Badge 
                        style={{ backgroundColor: resource.category.color }}
                        className="text-white"
                      >
                        {resource.category.name}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1 bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resource
                        </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                        </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedResources.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No resources found matching your criteria</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </CardContent>
          </Card>
        )}

        {/* Resource Types Overview */}
        <Card className="bg-green-screen-50 border-green-screen-100">
          <CardHeader>
            <CardTitle className="text-green-screen-400">Resource Types</CardTitle>
            <CardDescription>
              Different types of resources available to support your mental health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { type: 'article', label: 'Articles', icon: BookOpen, count: resources.filter(r => r.resource_type === 'article').length },
                { type: 'video', label: 'Videos', icon: Play, count: resources.filter(r => r.resource_type === 'video').length },
                { type: 'podcast', label: 'Podcasts', icon: Headphones, count: resources.filter(r => r.resource_type === 'podcast').length },
                { type: 'exercise', label: 'Exercises', icon: Dumbbell, count: resources.filter(r => r.resource_type === 'exercise').length },
                { type: 'book', label: 'Books', icon: Book, count: resources.filter(r => r.resource_type === 'book').length },
                { type: 'link', label: 'Links', icon: ExternalLink, count: resources.filter(r => r.resource_type === 'link').length }
              ].map(({ type, label, icon: Icon, count }) => (
                <div key={type} className="text-center p-4 bg-white rounded-lg">
                  <Icon className="w-8 h-8 mx-auto text-green-screen-400 mb-2" />
                  <h4 className="font-medium text-green-screen-400">{label}</h4>
                  <p className="text-sm text-muted-foreground">{count} resources</p>
              </div>
              ))}
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
