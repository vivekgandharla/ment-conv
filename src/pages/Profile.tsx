import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Camera, Edit, Save, X, Upload, User, Settings, Shield, Heart } from 'lucide-react';

interface ProfileData {
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

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    is_anonymous: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
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
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
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

      await fetchProfile();
      setEditMode(false);
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
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchProfile();
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-screen-400">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button
            onClick={() => setEditMode(!editMode)}
            variant={editMode ? "outline" : "default"}
            className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
          >
            {editMode ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="text-lg bg-green-screen-100 text-green-screen-400">
                        {getInitials(formData.display_name || user.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    {editMode && (
                      <div className="absolute -bottom-2 -right-2">
                        <Label htmlFor="avatar-upload" className="cursor-pointer">
                          <div className="w-8 h-8 bg-green-screen-200 rounded-full flex items-center justify-center hover:bg-green-screen-300 transition-colors">
                            <Camera className="w-4 h-4 text-green-screen-400" />
                          </div>
                        </Label>
                        <Input
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
                  <div className="flex-1">
                    <div className="space-y-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        disabled={!editMode}
                        placeholder="Enter your display name"
                        className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!editMode}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>

                {/* Email Display */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={user.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed from this page
                  </p>
                </div>

                {/* Member Since */}
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>

                {editMode && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={() => setEditMode(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Anonymous Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Post and comment anonymously
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_anonymous}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_anonymous: checked })}
                    disabled={!editMode}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-screen-100 text-green-screen-400">
                      Active
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Your account is in good standing
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your profile and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Display your recent activity on your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent discussions, comments, and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No recent activity to display
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start participating in discussions to see your activity here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 