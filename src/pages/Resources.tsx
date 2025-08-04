
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

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

// Add dummy data for showcase
const dummyResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    description: 'A comprehensive guide to understanding anxiety disorders, symptoms, and coping strategies.',
    url: 'https://example.com/anxiety-guide',
    resource_type: 'article',
    category_id: '1',
    difficulty_level: 'beginner',
    tags: ['anxiety', 'mental-health', 'coping'],
    rating: 4.8,
    rating_count: 156,
    view_count: 2340,
    is_approved: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author_id: 'user1',
    category: { id: '1', name: 'Anxiety', color: '#FF6B6B' },
    author: { id: 'user1', display_name: 'Dr. Sarah Johnson' }
  },
  {
    id: '2',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Learn the basics of mindfulness meditation with guided sessions and practical tips.',
    url: 'https://example.com/mindfulness',
    resource_type: 'video',
    category_id: '2',
    difficulty_level: 'beginner',
    tags: ['meditation', 'mindfulness', 'stress-relief'],
    rating: 4.9,
    rating_count: 203,
    view_count: 1890,
    is_approved: true,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    author_id: 'user2',
    category: { id: '2', name: 'Meditation', color: '#4ECDC4' },
    author: { id: 'user2', display_name: 'Mindful Living' }
  },
  {
    id: '3',
    title: 'Cognitive Behavioral Therapy Workbook',
    description: 'A practical workbook with exercises and techniques for managing negative thoughts.',
    url: 'https://example.com/cbt-workbook',
    resource_type: 'exercise',
    category_id: '3',
    difficulty_level: 'intermediate',
    tags: ['cbt', 'therapy', 'workbook', 'cognitive'],
    rating: 4.7,
    rating_count: 89,
    view_count: 1670,
    is_approved: true,
    created_at: '2024-01-08T09:15:00Z',
    updated_at: '2024-01-08T09:15:00Z',
    author_id: 'user3',
    category: { id: '3', name: 'Therapy', color: '#45B7D1' },
    author: { id: 'user3', display_name: 'Therapy Resources' }
  },
  {
    id: '4',
    title: 'The Science of Sleep and Mental Health',
    description: 'Explore the connection between sleep quality and mental health with evidence-based strategies.',
    url: 'https://example.com/sleep-mental-health',
    resource_type: 'article',
    category_id: '4',
    difficulty_level: 'intermediate',
    tags: ['sleep', 'mental-health', 'wellness', 'science'],
    rating: 4.6,
    rating_count: 134,
    view_count: 2150,
    is_approved: true,
    created_at: '2024-01-05T16:45:00Z',
    updated_at: '2024-01-05T16:45:00Z',
    author_id: 'user4',
    category: { id: '4', name: 'Sleep', color: '#96CEB4' },
    author: { id: 'user4', display_name: 'Sleep Science Institute' }
  },
  {
    id: '5',
    title: 'Managing Depression: Practical Strategies',
    description: 'Evidence-based strategies for managing depression symptoms and improving mood.',
    url: 'https://example.com/depression-management',
    resource_type: 'video',
    category_id: '5',
    difficulty_level: 'intermediate',
    tags: ['depression', 'mood', 'strategies', 'mental-health'],
    rating: 4.5,
    rating_count: 178,
    view_count: 1670,
    is_approved: true,
    created_at: '2024-01-03T11:20:00Z',
    updated_at: '2024-01-03T11:20:00Z',
    author_id: 'user5',
    category: { id: '5', name: 'Depression', color: '#FFEAA7' },
    author: { id: 'user5', display_name: 'Mental Health Foundation' }
  },
  {
    id: '6',
    title: 'Breathing Techniques for Stress Relief',
    description: 'Learn various breathing techniques to reduce stress and anxiety in daily life.',
    url: 'https://example.com/breathing-techniques',
    resource_type: 'exercise',
    category_id: '2',
    difficulty_level: 'beginner',
    tags: ['breathing', 'stress', 'anxiety', 'techniques'],
    rating: 4.8,
    rating_count: 245,
    view_count: 890,
    is_approved: true,
    created_at: '2024-01-01T13:10:00Z',
    updated_at: '2024-01-01T13:10:00Z',
    author_id: 'user6',
    category: { id: '2', name: 'Meditation', color: '#4ECDC4' },
    author: { id: 'user6', display_name: 'Wellness Coach' }
  }
];

export default function Resources() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    resource_type: 'article',
    category_id: '',
    difficulty_level: 'beginner',
    tags: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resources')
        .select(`*, category:categories(name, color), author:profiles(display_name)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Combine real data with dummy data for showcase
      const realResources = data || [];
      setResources([...realResources, ...dummyResources]);
    } catch (error) {
      // If Supabase fails, still show dummy data
      setResources(dummyResources);
      toast({ title: 'Error', description: 'Failed to load resources', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Login required', description: 'Please log in to share a resource.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('resources').insert({
        title: formData.title,
        description: formData.description,
        url: formData.url,
        resource_type: formData.resource_type,
        category_id: formData.category_id || null,
        difficulty_level: formData.difficulty_level,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        author_id: user.id,
        is_approved: false,
      });
      if (error) throw error;
      toast({ title: 'Resource submitted!', description: 'Your resource will be reviewed before appearing.', variant: 'success' });
      setShowDialog(false);
      setFormData({ title: '', description: '', url: '', resource_type: 'article', category_id: '', difficulty_level: 'beginner', tags: '' });
      fetchResources();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to submit resource', variant: 'destructive' });
    } finally {
      setSubmitting(false);
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
            
        {user && (
          <div className="flex justify-end mb-4">
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                  Share a Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Share a Resource</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} type="url" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="resource_type">Type</Label>
                      <Select value={formData.resource_type} onValueChange={v => setFormData({ ...formData, resource_type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="exercise">Exercise</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                        </SelectContent>
                      </Select>
              </div>
                    <div>
                      <Label htmlFor="difficulty_level">Difficulty</Label>
                      <Select value={formData.difficulty_level} onValueChange={v => setFormData({ ...formData, difficulty_level: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
            </div>
          </div>
                  <div>
                    <Label htmlFor="category_id">Category</Label>
                    <Select value={formData.category_id} onValueChange={v => setFormData({ ...formData, category_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={submitting} className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                      {submitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
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
