import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { 
  User, 
  Edit, 
  Save, 
  Camera, 
  Settings, 
  Shield, 
  Award, 
  MessageSquare, 
  Heart, 
  Eye,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Phone,
  BookOpen,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

interface ExpertVerification {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  profession: string;
  credentials: string;
  experience_years: number;
  organization: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
}

interface UserStats {
  discussions_count: number;
  comments_count: number;
  total_upvotes: number;
  total_views: number;
  member_since: string;
}

// Add new interfaces for enhanced features
interface ActivityItem {
  id: string;
  type: 'discussion' | 'comment' | 'resource' | 'achievement';
  title: string;
  content: string;
  created_at: string;
  upvotes: number;
  category?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
  category: 'participation' | 'support' | 'expertise' | 'community';
}

interface Connection {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  is_anonymous: boolean;
  connection_date: string;
}

export default function Profile() {
  const { userId } = useParams<{ userId?: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expertVerification, setExpertVerification] = useState<ExpertVerification | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [privacySettings, setPrivacySettings] = useState({
    show_email: false,
    show_activity: true,
    show_stats: true,
    allow_messages: true
  });

  // Form states
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    is_anonymous: false
  });

  // Dummy data for showcase
  const dummyActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'discussion',
      title: 'How do you cope with anxiety?',
      content: 'I\'ve been struggling with anxiety lately and would love to hear how others manage it.',
      created_at: '2024-01-15T10:00:00Z',
      upvotes: 23,
      category: 'Anxiety'
    },
    {
      id: '2',
      type: 'comment',
      title: 'Replied to "Daily mindfulness routine"',
      content: 'Great tips! I also find that 10 minutes of meditation helps me start the day right.',
      created_at: '2024-01-14T14:30:00Z',
      upvotes: 8
    },
    {
      id: '3',
      type: 'resource',
      title: 'Shared: Breathing Techniques Guide',
      content: 'A comprehensive guide to breathing exercises for stress relief.',
      created_at: '2024-01-13T09:15:00Z',
      upvotes: 15
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Earned: First Discussion Badge',
      content: 'Started your first discussion in the community!',
      created_at: '2024-01-12T16:45:00Z',
      upvotes: 0
    }
  ];

  const dummyBadges: Badge[] = [
    {
      id: '1',
      name: 'First Discussion',
      description: 'Started your first discussion in the community',
      icon: '💬',
      earned_at: '2024-01-12T16:45:00Z',
      category: 'participation'
    },
    {
      id: '2',
      name: 'Supportive Friend',
      description: 'Received 50+ upvotes on your supportive comments',
      icon: '🤝',
      earned_at: '2024-01-10T14:30:00Z',
      category: 'support'
    },
    {
      id: '3',
      name: 'Resource Sharer',
      description: 'Shared 10+ helpful resources with the community',
      icon: '📚',
      earned_at: '2024-01-08T11:20:00Z',
      category: 'expertise'
    },
    {
      id: '4',
      name: 'Community Pillar',
      description: 'Been an active member for 6+ months',
      icon: '🏛️',
      earned_at: '2024-01-05T09:15:00Z',
      category: 'community'
    }
  ];

  const dummyConnections: Connection[] = [
    {
      id: '1',
      user_id: 'user1',
      display_name: 'Sarah M.',
      avatar_url: null,
      bio: 'Mental health advocate and yoga instructor',
      is_anonymous: false,
      connection_date: '2024-01-10T14:30:00Z'
    },
    {
      id: '2',
      user_id: 'user2',
      display_name: 'Mike R.',
      avatar_url: null,
      bio: 'Wellness coach and meditation teacher',
      is_anonymous: false,
      connection_date: '2024-01-08T11:20:00Z'
    },
    {
      id: '3',
      user_id: 'user3',
      display_name: 'Anonymous',
      avatar_url: null,
      bio: null,
      is_anonymous: true,
      connection_date: '2024-01-05T09:15:00Z'
    }
  ];

  useEffect(() => {
    const targetUserId = userId || user?.id;
    if (targetUserId) {
      fetchProfile(targetUserId);
      fetchExpertVerification(targetUserId);
      fetchUserStats(targetUserId);
      fetchActivities(targetUserId);
      fetchBadges(targetUserId);
      fetchConnections(targetUserId);
      setIsOwnProfile(targetUserId === user?.id);
    }
  }, [userId, user?.id]);

  const fetchProfile = async (targetUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        display_name: data.display_name || '',
        bio: data.bio || '',
        is_anonymous: data.is_anonymous || false
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExpertVerification = async (targetUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('expert_verifications')
        .select('*')
        .eq('user_id', targetUserId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
      setExpertVerification(data ? {
        id: data.id,
        status: data.status as 'pending' | 'approved' | 'rejected',
        profession: data.profession,
        credentials: data.credentials,
        experience_years: data.experience_years,
        organization: data.organization,
        reviewed_at: data.reviewed_at,
        rejection_reason: data.rejection_reason
      } : null);
    } catch (error) {
      console.error('Error fetching expert verification:', error);
    }
  };

  const fetchUserStats = async (targetUserId: string) => {
    try {
      // Fetch discussions count
      const { count: discussionsCount } = await supabase
        .from('discussions')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', targetUserId);

      // Fetch comments count
      const { count: commentsCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', targetUserId);

      // Fetch total upvotes received
      const { data: discussions } = await supabase
        .from('discussions')
        .select('upvote_count')
        .eq('author_id', targetUserId);

      const { data: comments } = await supabase
        .from('comments')
        .select('upvote_count')
        .eq('author_id', targetUserId);

      const totalUpvotes = (discussions?.reduce((sum, d) => sum + (d.upvote_count || 0), 0) || 0) +
                          (comments?.reduce((sum, c) => sum + (c.upvote_count || 0), 0) || 0);

      // Fetch total views
      const { data: discussionsWithViews } = await supabase
        .from('discussions')
        .select('view_count')
        .eq('author_id', targetUserId);

      const totalViews = discussionsWithViews?.reduce((sum, d) => sum + (d.view_count || 0), 0) || 0;

      setUserStats({
        discussions_count: discussionsCount || 0,
        comments_count: commentsCount || 0,
        total_upvotes: totalUpvotes,
        total_views: totalViews,
        member_since: profile?.created_at || new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchActivities = async (targetUserId: string) => {
    try {
      // For now, use dummy data
      setActivities(dummyActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchBadges = async (targetUserId: string) => {
    try {
      // For now, use dummy data
      setBadges(dummyBadges);
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const fetchConnections = async (targetUserId: string) => {
    try {
      // For now, use dummy data
      setConnections(dummyConnections);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          is_anonymous: formData.is_anonymous
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? {
        ...prev,
        display_name: formData.display_name,
        bio: formData.bio,
        is_anonymous: formData.is_anonymous
      } : null);

      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const data = {
        profile,
        activities,
        badges,
        connections,
        stats: userStats,
        expertVerification
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mentconv-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: "Your data has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export your data",
        variant: "destructive",
      });
    }
  };

  const handlePrivacySettingChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Privacy Updated",
      description: "Your privacy settings have been updated",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="pt-6 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Profile not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="text-2xl bg-green-screen-100 text-green-screen-400">
                        {getInitials(profile?.display_name || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-green-screen-400">
                          {profile?.display_name || 'Anonymous User'}
                        </h1>
                        {expertVerification?.status === 'approved' && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className="bg-green-screen-200 text-green-screen-400">
                              <Award className="h-3 w-3 mr-1" />
                              Verified Expert
                            </Badge>
                          </div>
                        )}
                      </div>
                      {isOwnProfile && (
                        <Button
                          onClick={() => setEditing(!editing)}
                          className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {editing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                      )}
                    </div>
                    
                    {profile?.bio && (
                      <p className="text-slate-600 dark:text-slate-300">
                        {profile.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {formatDate(profile?.created_at || '')}</span>
                      </div>
                      {profile?.email && privacySettings.show_email && (
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            {privacySettings.show_stats && userStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-screen-400">{userStats.discussions_count}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Discussions</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-screen-400">{userStats.comments_count}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Comments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-screen-400">{userStats.total_upvotes}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Upvotes</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-screen-400">{userStats.total_views}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Views</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Expert Verification Status */}
                {expertVerification && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Expert Verification</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3">
                        {getVerificationStatusIcon(expertVerification.status)}
                        <div>
                          <div className="font-semibold">
                            {expertVerification.status === 'pending' && 'Verification Pending'}
                            {expertVerification.status === 'approved' && 'Verified Expert'}
                            {expertVerification.status === 'rejected' && 'Verification Rejected'}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {expertVerification.profession} • {expertVerification.experience_years} years experience
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Privacy Settings */}
                {isOwnProfile && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Privacy Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Email</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Display your email to other users</div>
                        </div>
                        <Switch
                          checked={privacySettings.show_email}
                          onCheckedChange={(checked) => handlePrivacySettingChange('show_email', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Activity</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Display your recent activity</div>
                        </div>
                        <Switch
                          checked={privacySettings.show_activity}
                          onCheckedChange={(checked) => handlePrivacySettingChange('show_activity', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Stats</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Display your statistics</div>
                        </div>
                        <Switch
                          checked={privacySettings.show_stats}
                          onCheckedChange={(checked) => handlePrivacySettingChange('show_stats', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Allow Messages</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Allow other users to message you</div>
                        </div>
                        <Switch
                          checked={privacySettings.allow_messages}
                          onCheckedChange={(checked) => handlePrivacySettingChange('allow_messages', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Export Data */}
                {isOwnProfile && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Export Your Data</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Download all your data in JSON format
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleExportData}
                          className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50"
                        >
                          Export Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                {activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 text-sm">
                          {activity.type === 'discussion' && '💬'}
                          {activity.type === 'comment' && '💭'}
                          {activity.type === 'resource' && '📚'}
                          {activity.type === 'achievement' && '🏆'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                              {activity.title}
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {formatDate(activity.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            {activity.content}
                          </p>
                          {activity.category && (
                            <Badge className="mt-2 text-xs" style={{ backgroundColor: '#4ECDC4', color: 'white' }}>
                              {activity.category}
                            </Badge>
                          )}
                        </div>
                        {activity.upvotes > 0 && (
                          <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                            <Heart className="h-4 w-4" />
                            <span>{activity.upvotes}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="badges" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <Card key={badge.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{badge.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                              {badge.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              {badge.description}
                            </p>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Earned {formatDate(badge.earned_at)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="connections" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connections.map((connection) => (
                    <Card key={connection.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={connection.avatar_url || ''} />
                            <AvatarFallback className="bg-green-screen-100 text-green-screen-400">
                              {connection.is_anonymous ? '?' : getInitials(connection.display_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                              {connection.display_name}
                            </h3>
                            {connection.bio && (
                              <p className="text-sm text-slate-600 dark:text-slate-300">
                                {connection.bio}
                              </p>
                            )}
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Connected {formatDate(connection.connection_date)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Settings (Only for own profile) */}
            {isOwnProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-screen-400">
                    <Settings className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input
                          id="display-name"
                          value={formData.display_name}
                          onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                          placeholder="Enter your display name"
                          className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="anonymous"
                          checked={formData.is_anonymous}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_anonymous: checked })}
                        />
                        <Label htmlFor="anonymous">Enable anonymous mode</Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile} className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Display Name</p>
                        <p className="text-sm text-muted-foreground">{profile.display_name || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Anonymous Mode</p>
                        <p className="text-sm text-muted-foreground">{profile.is_anonymous ? 'Enabled' : 'Disabled'}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Expert Verification Application (Only for own profile) */}
            {isOwnProfile && !expertVerification && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Award className="h-12 w-12 mx-auto text-green-screen-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-screen-400">Become a Verified Expert</h3>
                      <p className="text-muted-foreground">
                        Get verified as a mental health professional and help others with your expertise.
                      </p>
                    </div>
                    <Button asChild className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400">
                      <Link to="/expert-verification">
                        Apply for Verification
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 