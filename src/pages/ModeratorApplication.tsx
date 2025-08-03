import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { useToast } from '../hooks/use-toast';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  Users,
  Clock as ClockIcon,
  AlertTriangle,
  Heart,
  MessageSquare,
  Award,
  AlertCircle
} from 'lucide-react';

interface ModeratorApplication {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  experience: string;
  motivation: string;
  availability_hours: number;
  previous_moderation_experience: boolean;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export default function ModeratorApplication() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState<ModeratorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    experience: '',
    motivation: '',
    availability_hours: 0,
    previous_moderation_experience: false
  });

  useEffect(() => {
    if (user) {
      fetchApplication();
    }
  }, [user]);

  const fetchApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('moderator_applications')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setApplication(data);
        setFormData({
          full_name: data.full_name,
          email: data.email,
          experience: data.experience,
          motivation: data.motivation,
          availability_hours: data.availability_hours,
          previous_moderation_experience: data.previous_moderation_experience
        });
      }
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('moderator_applications')
        .upsert({
          user_id: user.id,
          full_name: formData.full_name,
          email: formData.email,
          experience: formData.experience,
          motivation: formData.motivation,
          availability_hours: formData.availability_hours,
          previous_moderation_experience: formData.previous_moderation_experience,
          status: 'pending'
        });

      if (error) throw error;

      await fetchApplication();
      toast({
        title: "Application Submitted",
        description: "Your moderator application has been submitted successfully. We'll review it within 5-7 business days.",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
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
              Please log in to apply for moderator position.
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
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-screen-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-screen-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-screen-400">Moderator Application</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help us maintain a safe and supportive community by becoming a moderator. Your role will be crucial in fostering positive discussions and ensuring everyone feels welcome.
            </p>
          </div>
        </div>

        {/* Role Description */}
        <Card className="bg-green-screen-50 border-green-screen-100">
          <CardHeader>
            <CardTitle className="text-green-screen-400">Moderator Role & Responsibilities</CardTitle>
            <CardDescription>
              Understand what it means to be a community moderator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-screen-400">What You'll Do</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Monitor Discussions</h5>
                      <p className="text-sm text-muted-foreground">Review posts and comments for community guidelines compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Support Members</h5>
                      <p className="text-sm text-muted-foreground">Help users navigate the platform and find resources</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Handle Reports</h5>
                      <p className="text-sm text-muted-foreground">Review and address user reports appropriately</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-screen-400">What You'll Get</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Moderator Badge</h5>
                      <p className="text-sm text-muted-foreground">Special recognition for your contributions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Community Impact</h5>
                      <p className="text-sm text-muted-foreground">Directly help create a supportive environment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ClockIcon className="w-5 h-5 text-green-screen-400 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Flexible Schedule</h5>
                      <p className="text-sm text-muted-foreground">Moderate at your own pace and availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Expectations</CardTitle>
            <CardDescription>
              What we look for in potential moderators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Minimum Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>At least 3 months as an active community member</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Consistent positive contribution to discussions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No history of community guideline violations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Commitment to mental health advocacy</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Time Commitment</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Minimum 5 hours per week</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Regular check-ins throughout the day</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Availability for training sessions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Long-term commitment (6+ months preferred)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Application Status */}
        {application && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Status</CardTitle>
                {getStatusBadge(application.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(application.status)}
                <span className="font-medium">
                  {application.status === 'pending' && 'Your application is under review'}
                  {application.status === 'approved' && 'Your application has been approved'}
                  {application.status === 'rejected' && 'Your application was not approved'}
                </span>
              </div>
              
              {application.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800">
                        We typically review moderator applications within 5-7 business days. You'll receive an email notification once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {application.status === 'rejected' && application.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Reason for Rejection</h4>
                      <p className="text-sm text-red-700 mt-1">{application.rejection_reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {application.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-800">
                        Congratulations! You've been selected as a moderator. We'll contact you soon with next steps and training information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Submitted:</span>
                  <span className="ml-2 text-muted-foreground">
                    {new Date(application.created_at).toLocaleDateString()}
                  </span>
                </div>
                {application.reviewed_at && (
                  <div>
                    <span className="font-medium">Reviewed:</span>
                    <span className="ml-2 text-muted-foreground">
                      {new Date(application.reviewed_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Form */}
        {(!application || application.status === 'rejected') && (
          <Card>
            <CardHeader>
              <CardTitle>Moderator Application</CardTitle>
              <CardDescription>
                Tell us about yourself and why you'd like to become a moderator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Describe your experience with mental health, community management, or any relevant background..."
                  rows={4}
                  className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Why do you want to become a moderator? What do you hope to contribute to the community?"
                  rows={4}
                  className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability_hours">Weekly Availability (hours) *</Label>
                  <Input
                    id="availability_hours"
                    type="number"
                    min="5"
                    max="40"
                    value={formData.availability_hours}
                    onChange={(e) => setFormData({ ...formData, availability_hours: parseInt(e.target.value) || 0 })}
                    placeholder="How many hours per week can you commit?"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                  <p className="text-xs text-muted-foreground">Minimum 5 hours per week required</p>
                </div>
                <div className="space-y-2">
                  <Label>Previous Moderation Experience</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="previous_experience"
                      checked={formData.previous_moderation_experience}
                      onCheckedChange={(checked) => setFormData({ ...formData, previous_moderation_experience: checked })}
                    />
                    <Label htmlFor="previous_experience" className="text-sm">
                      I have previous experience moderating online communities
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Important Information</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Moderators are volunteers and do not receive monetary compensation</li>
                      <li>• You'll receive training and support from our team</li>
                      <li>• Applications are reviewed within 5-7 business days</li>
                      <li>• We may contact you for additional information or an interview</li>
                      <li>• Providing false information may result in account suspension</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.full_name || !formData.email || !formData.experience || !formData.motivation || formData.availability_hours < 5}
                  className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 