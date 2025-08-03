
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { useToast } from '../hooks/use-toast';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  MoreHorizontal, 
  Clock, 
  Eye, 
  MessageCircle,
  TrendingUp,
  Filter,
  Search,
  User,
  UserX
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  category_id: string | null;
  is_anonymous: boolean;
  anonymous_name: string | null;
  view_count: number;
  comment_count: number;
  upvote_count: number;
  downvote_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  category?: {
    name: string;
    color: string;
  };
  user_vote?: 'upvote' | 'downvote' | null;
}

interface Comment {
  id: string;
  discussion_id: string;
  author_id: string | null;
  parent_comment_id: string | null;
  content: string;
  is_anonymous: boolean;
  anonymous_name: string | null;
  upvote_count: number;
  downvote_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  user_vote?: 'upvote' | 'downvote' | null;
  replies?: Comment[];
}

interface Category {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

export default function Discussions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDiscussionDialog, setShowDiscussionDialog] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    is_anonymous: false,
    anonymous_name: ''
  });

  const [commentData, setCommentData] = useState({
    content: '',
    is_anonymous: false,
    anonymous_name: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchDiscussions();
  }, [sortBy, selectedCategory, searchQuery]);

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

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('discussions')
        .select(`
          *,
          author:profiles(display_name, avatar_url),
          category:categories(name, color)
        `);

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'most_voted':
          query = query.order('upvote_count', { ascending: false });
          break;
        case 'most_commented':
          query = query.order('comment_count', { ascending: false });
          break;
        case 'trending':
          query = query.order('view_count', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch user votes for discussions
      if (user) {
        const { data: votes } = await supabase
          .from('votes')
          .select('target_id, vote_type')
          .eq('user_id', user.id)
          .eq('target_type', 'discussion');

        const voteMap = new Map(votes?.map(v => [v.target_id, v.vote_type as 'upvote' | 'downvote']) || []);
        
        setDiscussions(data?.map(discussion => ({
          ...discussion,
          user_vote: voteMap.get(discussion.id) || null
        })) || []);
      } else {
        setDiscussions(data || []);
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast({
        title: "Error",
        description: "Failed to load discussions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (discussionId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles(display_name, avatar_url)
        `)
        .eq('discussion_id', discussionId)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch user votes for comments
      if (user) {
        const { data: votes } = await supabase
          .from('votes')
          .select('target_id, vote_type')
          .eq('user_id', user.id)
          .eq('target_type', 'comment');

        const voteMap = new Map(votes?.map(v => [v.target_id, v.vote_type as 'upvote' | 'downvote']) || []);
        
        setComments(data?.map(comment => ({
          ...comment,
          user_vote: voteMap.get(comment.id) || null
        })) || []);
      } else {
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleVote = async (targetId: string, targetType: 'discussion' | 'comment', voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to vote",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('user_id', user.id)
        .eq('target_id', targetId)
        .eq('target_type', targetType)
        .single();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote
          await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);

          // Update counts
          const countField = voteType === 'upvote' ? 'upvote_count' : 'downvote_count';
          await supabase
            .from(targetType === 'discussion' ? 'discussions' : 'comments')
            .update({ [countField]: supabase.rpc('decrement', { value: 1 }) })
            .eq('id', targetId);
        } else {
          // Change vote
          await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          // Update counts
          const oldCountField = existingVote.vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
          const newCountField = voteType === 'upvote' ? 'upvote_count' : 'downvote_count';
          
          await supabase
            .from(targetType === 'discussion' ? 'discussions' : 'comments')
            .update({ 
              [oldCountField]: supabase.rpc('decrement', { value: 1 }),
              [newCountField]: supabase.rpc('increment', { value: 1 })
            })
            .eq('id', targetId);
        }
      } else {
        // Create new vote
        await supabase
          .from('votes')
          .insert({
            user_id: user.id,
            target_id: targetId,
            target_type: targetType,
            vote_type: voteType
          });

        // Update count
        const countField = voteType === 'upvote' ? 'upvote_count' : 'downvote_count';
        await supabase
          .from(targetType === 'discussion' ? 'discussions' : 'comments')
          .update({ [countField]: supabase.rpc('increment', { value: 1 }) })
          .eq('id', targetId);
      }

      // Refresh data
      if (targetType === 'discussion') {
        fetchDiscussions();
      } else {
        fetchComments(targetId);
      }
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to submit vote",
        variant: "destructive"
      });
    }
  };

  const handleCreateDiscussion = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('discussions')
        .insert({
          title: formData.title,
          content: formData.content,
          author_id: user.id,
          category_id: formData.category_id || null,
          is_anonymous: formData.is_anonymous,
          anonymous_name: formData.is_anonymous ? formData.anonymous_name : null
        });

      if (error) throw error;

      setShowCreateDialog(false);
      setFormData({
        title: '',
        content: '',
        category_id: '',
        is_anonymous: false,
        anonymous_name: ''
      });
      
      fetchDiscussions();
      toast({
        title: "Success",
        description: "Discussion created successfully",
      });
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to create discussion",
        variant: "destructive"
      });
    }
  };

  const handleCreateComment = async (discussionId: string, parentCommentId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          discussion_id: discussionId,
          author_id: user.id,
          parent_comment_id: parentCommentId || null,
          content: commentData.content,
          is_anonymous: commentData.is_anonymous,
          anonymous_name: commentData.is_anonymous ? commentData.anonymous_name : null
        });

      if (error) throw error;

      // Update comment count
      await supabase
        .from('discussions')
        .update({ comment_count: supabase.rpc('increment', { value: 1 }) })
        .eq('id', discussionId);

      setCommentData({
        content: '',
        is_anonymous: false,
        anonymous_name: ''
      });
      
      fetchComments(discussionId);
      fetchDiscussions();
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  const openDiscussion = async (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    await fetchComments(discussion.id);
    setShowDiscussionDialog(true);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-screen-400">Discussions</h1>
            <p className="text-muted-foreground">Join the conversation and share your thoughts</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
                <DialogDescription>
                  Start a new conversation with the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter discussion title"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your thoughts..."
                    rows={6}
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="anonymous"
                      checked={formData.is_anonymous}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_anonymous: checked })}
                    />
                    <Label htmlFor="anonymous">Post anonymously</Label>
                  </div>
                  {formData.is_anonymous && (
                    <div className="flex-1">
                      <Input
                        value={formData.anonymous_name}
                        onChange={(e) => setFormData({ ...formData, anonymous_name: e.target.value })}
                        placeholder="Anonymous name (optional)"
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateDiscussion}
                    disabled={!formData.title || !formData.content}
                    className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                  >
                    Create Discussion
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most_voted">Most Voted</SelectItem>
              <SelectItem value="most_commented">Most Commented</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Discussions List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : discussions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No discussions found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openDiscussion(discussion)}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    {/* Vote Buttons */}
                    <div className="flex flex-col items-center space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(discussion.id, 'discussion', 'upvote');
                        }}
                        className={`h-8 w-8 p-0 ${discussion.user_vote === 'upvote' ? 'text-green-screen-400' : 'text-muted-foreground'}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {discussion.upvote_count - discussion.downvote_count}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(discussion.id, 'discussion', 'downvote');
                        }}
                        className={`h-8 w-8 p-0 ${discussion.user_vote === 'downvote' ? 'text-red-500' : 'text-muted-foreground'}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>

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
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.comment_count} comments</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{discussion.view_count} views</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {discussion.is_anonymous ? (
                            <div className="flex items-center space-x-1">
                              <UserX className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {discussion.anonymous_name || 'Anonymous'}
                              </span>
                            </div>
                          ) : (
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Discussion Dialog */}
      <Dialog open={showDiscussionDialog} onOpenChange={setShowDiscussionDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDiscussion && (
            <div className="space-y-6">
              {/* Discussion Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {selectedDiscussion.category && (
                    <Badge 
                      className="text-white"
                      style={{ backgroundColor: selectedDiscussion.category.color }}
                    >
                      {selectedDiscussion.category.name}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {formatTimeAgo(selectedDiscussion.created_at)}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-green-screen-400">
                  {selectedDiscussion.title}
                </h2>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {selectedDiscussion.is_anonymous ? (
                      <div className="flex items-center space-x-1">
                        <UserX className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {selectedDiscussion.anonymous_name || 'Anonymous'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedDiscussion.author?.avatar_url || ''} />
                          <AvatarFallback className="bg-green-screen-100 text-green-screen-400">
                            {getInitials(selectedDiscussion.author?.display_name || 'U')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {selectedDiscussion.author?.display_name || 'Unknown'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDiscussion.upvote_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDiscussion.downvote_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDiscussion.comment_count}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Discussion Content */}
              <div className="prose max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {selectedDiscussion.content}
                </p>
              </div>

              <Separator />

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Comments ({selectedDiscussion.comment_count})</h3>
                
                {/* Add Comment */}
                <div className="space-y-4 p-4 bg-green-screen-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="comment-anonymous"
                      checked={commentData.is_anonymous}
                      onCheckedChange={(checked) => setCommentData({ ...commentData, is_anonymous: checked })}
                    />
                    <Label htmlFor="comment-anonymous">Comment anonymously</Label>
                  </div>
                  {commentData.is_anonymous && (
                    <Input
                      value={commentData.anonymous_name}
                      onChange={(e) => setCommentData({ ...commentData, anonymous_name: e.target.value })}
                      placeholder="Anonymous name (optional)"
                      className="bg-white border-green-screen-100 focus:border-green-screen-200"
                    />
                  )}
                  <Textarea
                    value={commentData.content}
                    onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                    placeholder="Add a comment..."
                    rows={3}
                    className="bg-white border-green-screen-100 focus:border-green-screen-200"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleCreateComment(selectedDiscussion.id)}
                      disabled={!commentData.content}
                      className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                    >
                      Add Comment
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                      {/* Vote Buttons */}
                      <div className="flex flex-col items-center space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(comment.id, 'comment', 'upvote')}
                          className={`h-6 w-6 p-0 ${comment.user_vote === 'upvote' ? 'text-green-screen-400' : 'text-muted-foreground'}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <span className="text-xs font-medium">
                          {comment.upvote_count - comment.downvote_count}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(comment.id, 'comment', 'downvote')}
                          className={`h-6 w-6 p-0 ${comment.user_vote === 'downvote' ? 'text-red-500' : 'text-muted-foreground'}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {comment.is_anonymous ? (
                              <div className="flex items-center space-x-1">
                                <UserX className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">
                                  {comment.anonymous_name || 'Anonymous'}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={comment.author?.avatar_url || ''} />
                                  <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                                    {getInitials(comment.author?.display_name || 'U')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {comment.author?.display_name || 'Unknown'}
                                </span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(comment.created_at)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
