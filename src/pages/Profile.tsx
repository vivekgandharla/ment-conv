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

  // Form states
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    is_anonymous: false
  });

  useEffect(() => {
    const targetUserId = userId || user?.id;
    if (targetUserId) {
      fetchProfile(targetUserId);
      fetchExpertVerification(targetUserId);
      fetchUserStats(targetUserId);
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
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar_url || ''} />
                  <AvatarFallback className="text-2xl bg-green-screen-100 text-green-screen-400">
                    {getInitials(profile.display_name || profile.email || 'U')}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <div className="absolute -bottom-2 -right-2">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="w-8 h-8 bg-green-screen-200 rounded-full flex items-center justify-center hover:bg-green-screen-300 transition-colors">
                        <Camera className="h-4 w-4 text-green-screen-400" />
                      </div>
                    </Label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-green-screen-400">
                      {profile.display_name || 'Anonymous User'}
                    </h1>
                    <p className="text-muted-foreground">
                      {profile.email}
                    </p>
                    {profile.is_anonymous && (
                      <Badge variant="secondary" className="mt-2">
                        <Shield className="h-3 w-3 mr-1" />
                        Anonymous Mode
                      </Badge>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Button
                      onClick={() => setEditing(!editing)}
                      variant="outline"
                      className="border-green-screen-200 text-green-screen-400 hover:bg-green-screen-50"
                    >
                      {editing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
                      {editing ? 'Save' : 'Edit'}
                    </Button>
                  )}
                </div>

                {/* Expert Verification Badge */}
                {expertVerification && expertVerification.status === 'approved' && (
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-screen-200 text-green-screen-400">
                      <Award className="h-3 w-3 mr-1" />
                      Verified Expert
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {expertVerification.profession} • {expertVerification.experience_years} years experience
                    </span>
                  </div>
                )}

                {/* Bio */}
                {editing ? (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {profile.bio || 'No bio available'}
                  </p>
                )}

                {/* Member Since */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {formatDate(profile.created_at)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {userStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-6 w-6 mx-auto text-green-screen-400 mb-2" />
                <div className="text-2xl font-bold text-green-screen-400">{userStats.discussions_count}</div>
                <div className="text-sm text-muted-foreground">Discussions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <User className="h-6 w-6 mx-auto text-green-screen-400 mb-2" />
                <div className="text-2xl font-bold text-green-screen-400">{userStats.comments_count}</div>
                <div className="text-sm text-muted-foreground">Comments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Heart className="h-6 w-6 mx-auto text-green-screen-400 mb-2" />
                <div className="text-2xl font-bold text-green-screen-400">{userStats.total_upvotes}</div>
                <div className="text-sm text-muted-foreground">Upvotes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Eye className="h-6 w-6 mx-auto text-green-screen-400 mb-2" />
                <div className="text-2xl font-bold text-green-screen-400">{userStats.total_views}</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Expert Verification Status */}
        {expertVerification && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-screen-400">
                <Award className="h-5 w-5" />
                Expert Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getVerificationStatusIcon(expertVerification.status)}
                  <span className="font-medium capitalize">{expertVerification.status}</span>
                </div>
                <Badge 
                  variant={expertVerification.status === 'approved' ? 'default' : 'secondary'}
                  className={expertVerification.status === 'approved' ? 'bg-green-screen-200 text-green-screen-400' : ''}
                >
                  {expertVerification.profession}
                </Badge>
              </div>
              {expertVerification.status === 'rejected' && expertVerification.rejection_reason && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    <strong>Reason:</strong> {expertVerification.rejection_reason}
                  </p>
                </div>
              )}
              {expertVerification.status === 'pending' && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Your application is under review. This usually takes 2-3 business days.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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