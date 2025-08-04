
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
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
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
  UserX,
  Share2,
  BookOpen,
  Link as LinkIcon,
  Reply,
  Heart,
  Bookmark,
  Play,
  Headphones,
  ChevronDown, ChevronRight, Minus
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
  shared_resources?: SharedResource[];
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
  shared_resources?: SharedResource[];
}

interface SharedResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'podcast' | 'book' | 'exercise' | 'other';
  author?: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

// Add dummy data for showcase
const dummyCategories: Category[] = [
  { id: '1', name: 'Anxiety', color: '#FF6B6B', description: 'Discussions about anxiety and stress' },
  { id: '2', name: 'Depression', color: '#4ECDC4', description: 'Support for depression and mood' },
  { id: '3', name: 'Self-Care', color: '#45B7D1', description: 'Self-care and wellness tips' },
  { id: '4', name: 'Relationships', color: '#96CEB4', description: 'Relationship and social support' },
  { id: '5', name: 'Therapy', color: '#FFEAA7', description: 'Therapy and professional help' }
];

const dummyDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How do you cope with anxiety?',
    content: 'I\'ve been struggling with anxiety lately and would love to hear how others manage it. What techniques work best for you?',
    author_id: 'user1',
    category_id: '1',
    is_anonymous: false,
    anonymous_name: null,
    view_count: 156,
    comment_count: 8,
    upvote_count: 23,
    downvote_count: 2,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author: { display_name: 'Sarah M.', avatar_url: null },
    category: { name: 'Anxiety', color: '#FF6B6B' },
    user_vote: null
  },
  {
    id: '2',
    title: 'Daily mindfulness routine',
    content: 'I started a 10-minute daily mindfulness practice and it\'s been amazing for my mental health. Anyone else have a routine they\'d like to share?',
    author_id: 'user2',
    category_id: '3',
    is_anonymous: false,
    anonymous_name: null,
    view_count: 89,
    comment_count: 12,
    upvote_count: 45,
    downvote_count: 1,
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:30:00Z',
    author: { display_name: 'Mike R.', avatar_url: null },
    category: { name: 'Self-Care', color: '#45B7D1' },
    user_vote: null
  },
  {
    id: '3',
    title: 'Anonymous: Feeling overwhelmed',
    content: 'I\'m feeling really overwhelmed with work and life right now. Just needed to get this off my chest.',
    author_id: null,
    category_id: '2',
    is_anonymous: true,
    anonymous_name: 'Anonymous',
    view_count: 203,
    comment_count: 15,
    upvote_count: 67,
    downvote_count: 3,
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T09:15:00Z',
    author: undefined,
    category: { name: 'Depression', color: '#4ECDC4' },
    user_vote: null
  }
];

export default function Discussions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDiscussionDialog, setShowDiscussionDialog] = useState(false);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [commentContent, setCommentContent] = useState('');
  const [commentIsAnonymous, setCommentIsAnonymous] = useState(false);
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'article' as 'article' | 'video' | 'podcast' | 'book' | 'exercise' | 'other',
    author: ''
  });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    is_anonymous: false,
    anonymous_name: ''
  });

  const [collapsedComments, setCollapsedComments] = useState<Set<string>>(new Set());
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDiscussions();
    fetchCategories();
  }, [searchTerm, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      // Use dummy data if no categories found
      setCategories(data?.length ? data : dummyCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to dummy data
      setCategories(dummyCategories);
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

      // Apply filters
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'latest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('upvote_count', { ascending: false });
          break;
        case 'trending':
          query = query.order('view_count', { ascending: false });
          break;
        case 'most_commented':
          query = query.order('comment_count', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch user votes separately to avoid the relation error
      let discussionsWithVotes = data || [];
      if (user) {
        const { data: userVotes } = await supabase
          .from('votes')
          .select('target_id, vote_type')
          .eq('user_id', user.id)
          .eq('target_type', 'discussion');

        discussionsWithVotes = data?.map(discussion => ({
          ...discussion,
          user_vote: userVotes?.find(vote => vote.target_id === discussion.id)?.vote_type as 'upvote' | 'downvote' | null
        })) || [];
      }

      // Use dummy data if no discussions found
      if (!discussionsWithVotes.length) {
        discussionsWithVotes = dummyDiscussions;
      }

      setDiscussions(discussionsWithVotes as Discussion[]);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      // Fallback to dummy data
      setDiscussions(dummyDiscussions);
      toast({
        title: "Error",
        description: "Failed to load discussions, showing sample data",
        variant: "destructive",
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
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch user votes for comments separately
      let commentsWithVotes = data || [];
      if (user) {
        const { data: userVotes } = await supabase
          .from('votes')
          .select('target_id, vote_type')
          .eq('user_id', user.id)
          .eq('target_type', 'comment');

        commentsWithVotes = data?.map(comment => ({
          ...comment,
          user_vote: userVotes?.find(vote => vote.target_id === comment.id)?.vote_type as 'upvote' | 'downvote' | null
        })) || [];
      }

      // Organize comments into hierarchy
      const topLevelComments = commentsWithVotes.filter(comment => !comment.parent_comment_id);
      const replies = commentsWithVotes.filter(comment => comment.parent_comment_id);

      const organizedComments = topLevelComments.map(comment => ({
        ...comment,
        replies: replies.filter(reply => reply.parent_comment_id === comment.id)
      }));

      setComments(organizedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleVote = async (targetId: string, targetType: 'discussion' | 'comment', voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to vote",
        variant: "destructive",
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
          // Remove vote if clicking same button
          await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);
        } else {
          // Update vote
          await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
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
      }

      // Update counts
      const { data: currentData } = await supabase
        .from(targetType === 'discussion' ? 'discussions' : 'comments')
        .select('upvote_count, downvote_count')
        .eq('id', targetId)
        .single();

      if (currentData) {
        let newUpvotes = currentData.upvote_count;
        let newDownvotes = currentData.downvote_count;

        if (existingVote) {
          if (existingVote.vote_type === voteType) {
            // Remove vote
            if (voteType === 'upvote') newUpvotes--;
            else newDownvotes--;
          } else {
            // Change vote
            if (voteType === 'upvote') {
              newUpvotes++;
              newDownvotes--;
            } else {
              newUpvotes--;
              newDownvotes++;
            }
          }
        } else {
          // Add new vote
          if (voteType === 'upvote') newUpvotes++;
          else newDownvotes++;
        }

        await supabase
          .from(targetType === 'discussion' ? 'discussions' : 'comments')
          .update({
            upvote_count: newUpvotes,
            downvote_count: newDownvotes
          })
          .eq('id', targetId);
      }

      // Refresh the data
      if (targetType === 'discussion') {
        fetchDiscussions();
      } else {
        fetchComments(selectedDiscussion?.id || '');
      }
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to vote",
        variant: "destructive",
      });
    }
  };

  const handleCreateDiscussion = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a discussion",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('discussions')
        .insert({
          title: formData.title,
          content: formData.content,
          author_id: user.id,
          category_id: formData.category_id || null,
          is_anonymous: formData.is_anonymous,
          anonymous_name: formData.is_anonymous ? formData.anonymous_name : null
        })
        .select()
        .single();

      if (error) throw error;

      setFormData({
        title: '',
        content: '',
        category_id: '',
        is_anonymous: false,
        anonymous_name: ''
      });
      setShowCreateDialog(false);
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
        variant: "destructive",
      });
    }
  };

  const handleCreateComment = async (discussionId: string, parentCommentId?: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          discussion_id: discussionId,
          author_id: user.id,
          parent_comment_id: parentCommentId || null,
          content: commentContent,
          is_anonymous: commentIsAnonymous,
          anonymous_name: commentIsAnonymous ? 'Anonymous' : null
        })
        .select()
        .single();

      if (error) throw error;

      // Update comment count
      const { data: currentData } = await supabase
        .from('discussions')
        .select('comment_count')
        .eq('id', discussionId)
        .single();

      if (currentData) {
        await supabase
          .from('discussions')
          .update({ comment_count: currentData.comment_count + 1 })
          .eq('id', discussionId);
      }

      setCommentContent('');
      setCommentIsAnonymous(false);
      setReplyingTo(null);
      fetchComments(discussionId);
      fetchDiscussions();

      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    }
  };

  const handleShareResource = async (targetId: string, targetType: 'discussion' | 'comment') => {
    // Placeholder for resource sharing functionality
    toast({
      title: "Feature Coming Soon",
      description: "Resource sharing will be available soon",
    });
    setShowResourceDialog(false);
  };

  const openDiscussion = async (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    // Increment view count
    try {
      const { data: currentData } = await supabase
        .from('discussions')
        .select('view_count')
        .eq('id', discussion.id)
        .single();
      if (currentData) {
        const newCount = (currentData.view_count as number) + 1;
        await supabase.from('discussions').update({ view_count: newCount }).eq('id', discussion.id);
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
    await fetchComments(discussion.id);
    setShowDiscussionDialog(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Play className="h-4 w-4" />;
      case 'podcast': return <Headphones className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      case 'exercise': return <Heart className="h-4 w-4" />;
      default: return <LinkIcon className="h-4 w-4" />;
    }
  };
  
  const toggleCommentCollapse = (commentId: string) => {
    const newCollapsed = new Set(collapsedComments);
    if (newCollapsed.has(commentId)) {
      newCollapsed.delete(commentId);
    } else {
      newCollapsed.add(commentId);
    }
    setCollapsedComments(newCollapsed);
  };

  const toggleRepliesExpansion = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  const renderComment = (comment: Comment, depth: number = 0, isReply: boolean = false) => {
    const isCollapsed = collapsedComments.has(comment.id);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedReplies.has(comment.id);

    return (
      <div key={comment.id} className="space-y-3">
        <div className={`flex space-x-4 ${isReply ? 'ml-8' : ''}`}>
          {/* Thread line for replies */}
          {isReply && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
          
          <div className="flex flex-col items-center space-y-2 min-w-[40px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(comment.id, 'comment', 'upvote')}
              className={`h-6 w-6 p-0 ${comment.user_vote === 'upvote' ? 'text-green-screen-400' : 'text-muted-foreground'}`}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <span className="text-xs font-medium text-green-screen-400">
              {comment.upvote_count - comment.downvote_count}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(comment.id, 'comment', 'downvote')}
              className={`h-6 w-6 p-0 ${comment.user_vote === 'downvote' ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={comment.author?.avatar_url || ''} />
                <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                  {comment.is_anonymous ? (
                    <UserX className="h-3 w-3" />
                  ) : (
                    getInitials(comment.author?.display_name || comment.anonymous_name || 'U')
                  )}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">
                {comment.is_anonymous 
                  ? comment.anonymous_name || 'Anonymous'
                  : comment.author?.display_name || 'Unknown User'
                }
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(comment.created_at)}
              </span>
              {hasReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCommentCollapse(comment.id)}
                  className="text-xs h-6 px-2 text-muted-foreground hover:text-green-screen-400"
                >
                  {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {comment.replies?.length || 0} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                </Button>
              )}
            </div>
            
            {!isCollapsed && (
              <>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
                <div className="flex items-center space-x-2">
                  {user && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(comment.id)}
                      className="text-xs h-6 px-2"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResourceDialog(true)}
                    className="text-xs h-6 px-2"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share Resource
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Reply Form */}
        {user && replyingTo === comment.id && !isCollapsed && (
          <Card className="ml-12 bg-green-screen-50/30 border-green-screen-100">
            <CardContent className="p-3">
              <div className="space-y-3">
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Reply to this comment..."
                  rows={2}
                  className="bg-white border-green-screen-100 focus:border-green-screen-200"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reply-anonymous"
                      checked={commentIsAnonymous}
                      onCheckedChange={setCommentIsAnonymous}
                    />
                    <Label htmlFor="reply-anonymous">Reply anonymously</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCreateComment(selectedDiscussion.id, comment.id)}
                      disabled={!commentContent.trim()}
                      className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                    >
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Replies */}
        {hasReplies && !isCollapsed && (
          <div className="ml-8 space-y-3">
            {comment.replies?.slice(0, isExpanded ? undefined : 3).map((reply) => 
              renderComment(reply, depth + 1, true)
            )}
            
            {comment.replies && comment.replies.length > 3 && (
              <div className="ml-8">
                {!isExpanded ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRepliesExpansion(comment.id)}
                    className="text-xs h-6 px-2 text-muted-foreground hover:text-green-screen-400"
                  >
                    Show {comment.replies.length - 3} more replies
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRepliesExpansion(comment.id)}
                    className="text-xs h-6 px-2 text-muted-foreground hover:text-green-screen-400"
                  >
                    Show less
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
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
          
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="most_commented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Discussions List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-screen-200 mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading discussions...</p>
                </div>
              ) : discussions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-screen-400">No discussions found</h3>
                  <p className="text-muted-foreground">Be the first to start a conversation!</p>
                </div>
              ) : (
                discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openDiscussion(discussion)}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(discussion.id, 'discussion', 'upvote');
                            }}
                            className={`h-8 w-8 p-0 ${discussion.user_vote === 'upvote' ? 'text-green-screen-400' : 'text-muted-foreground'}`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium text-green-screen-400">
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
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-green-screen-400 hover:text-green-screen-300 transition-colors">
                                {discussion.title}
                              </h3>
                              <p className="text-muted-foreground line-clamp-2 mt-1">
                                {discussion.content}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={discussion.author?.avatar_url || ''} />
                                  <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                                    {discussion.is_anonymous ? (
                                      <UserX className="h-3 w-3" />
                                    ) : (
                                      getInitials(discussion.author?.display_name || discussion.anonymous_name || 'U')
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {discussion.is_anonymous 
                                    ? discussion.anonymous_name || 'Anonymous'
                                    : discussion.author?.display_name || 'Unknown User'
                                  }
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimeAgo(discussion.created_at)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{discussion.view_count}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{discussion.comment_count}</span>
                              </div>
                            </div>
                            {discussion.category && (
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: discussion.category.color + '20', color: discussion.category.color, borderColor: discussion.category.color + '40' }}
                              >
                                {discussion.category.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Discussion Dialog */}
      <Dialog open={showDiscussionDialog} onOpenChange={setShowDiscussionDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDiscussion && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-green-screen-400">{selectedDiscussion.title}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedDiscussion.author?.avatar_url || ''} />
                          <AvatarFallback className="text-xs bg-green-screen-100 text-green-screen-400">
                            {selectedDiscussion.is_anonymous ? (
                              <UserX className="h-3 w-3" />
                            ) : (
                              getInitials(selectedDiscussion.author?.display_name || selectedDiscussion.anonymous_name || 'U')
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {selectedDiscussion.is_anonymous 
                            ? selectedDiscussion.anonymous_name || 'Anonymous'
                            : selectedDiscussion.author?.display_name || 'Unknown User'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(selectedDiscussion.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{selectedDiscussion.view_count} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(selectedDiscussion.id, 'discussion', 'upvote')}
                      className={selectedDiscussion.user_vote === 'upvote' ? 'text-green-screen-400' : 'text-muted-foreground'}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {selectedDiscussion.upvote_count}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(selectedDiscussion.id, 'discussion', 'downvote')}
                      className={selectedDiscussion.user_vote === 'downvote' ? 'text-red-500' : 'text-muted-foreground'}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {selectedDiscussion.downvote_count}
                    </Button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{selectedDiscussion.content}</p>
                </div>
                {selectedDiscussion.category && (
                  <Badge 
                    className="text-sm"
                    style={{ backgroundColor: selectedDiscussion.category.color + '20', color: selectedDiscussion.category.color, borderColor: selectedDiscussion.category.color + '40' }}
                  >
                    {selectedDiscussion.category.name}
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Comments Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-screen-400">
                    Comments ({comments.length})
                  </h3>
                  {user && (
                    <Button
                      onClick={() => setReplyingTo(null)}
                      className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  )}
                </div>

                {/* Add Comment Form */}
                {user && replyingTo === null && (
                  <Card className="bg-green-screen-50/50 border-green-screen-100">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Textarea
                          value={commentContent}
                          onChange={(e) => setCommentContent(e.target.value)}
                          placeholder="Share your thoughts..."
                          rows={3}
                          className="bg-white border-green-screen-100 focus:border-green-screen-200"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="comment-anonymous"
                              checked={commentIsAnonymous}
                              onCheckedChange={setCommentIsAnonymous}
                            />
                            <Label htmlFor="comment-anonymous">Comment anonymously</Label>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleCreateComment(selectedDiscussion.id)}
                              disabled={!commentContent.trim()}
                              className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                            >
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => renderComment(comment))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resource Sharing Dialog */}
      <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share a Resource</DialogTitle>
            <DialogDescription>
              Share a resource that helped you in your mental health journey
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resource-title">Title</Label>
              <Input
                id="resource-title"
                value={resourceData.title}
                onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                placeholder="Resource title"
                className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-description">Description</Label>
              <Textarea
                id="resource-description"
                value={resourceData.description}
                onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                placeholder="Brief description of how this resource helped you"
                rows={3}
                className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-url">URL (optional)</Label>
              <Input
                id="resource-url"
                value={resourceData.url}
                onChange={(e) => setResourceData({ ...resourceData, url: e.target.value })}
                placeholder="https://..."
                className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-type">Type</Label>
              <Select value={resourceData.type} onValueChange={(value: 'article' | 'video' | 'podcast' | 'book' | 'exercise' | 'other') => setResourceData({ ...resourceData, type: value })}>
                <SelectTrigger className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-author">Author/Creator (optional)</Label>
              <Input
                id="resource-author"
                value={resourceData.author}
                onChange={(e) => setResourceData({ ...resourceData, author: e.target.value })}
                placeholder="Author or creator name"
                className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowResourceDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleShareResource(selectedDiscussion?.id || '', 'discussion')}
                disabled={!resourceData.title || !resourceData.description}
                className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
              >
                Share Resource
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
